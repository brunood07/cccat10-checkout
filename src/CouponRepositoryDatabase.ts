import pgp from "pg-promise";
import Coupon from "./Coupon";
import CouponRepository from "./CouponRepository";

export default class CouponRepositoryDatabase implements CouponRepository {
  async getCoupon(code: string): Promise<Coupon> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    const [couponData] = await connection.query(
      "select * from checkout.coupon where code = $1",
      [code]
    );
    await connection.$pool.end();
    return new Coupon(
      couponData.code,
      parseFloat(couponData.percentage),
      couponData.expire_date
    );
  }
}
