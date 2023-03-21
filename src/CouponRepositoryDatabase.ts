import pgp from "pg-promise";

export default class CouponRepositoryDatabase {
  async getCoupon(code: string): Promise<any> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    const [couponData] = await connection.query(
      "select * from checkout.coupon where code = $1",
      [code]
    );
    await connection.$pool.end();
    return couponData;
  }
}
