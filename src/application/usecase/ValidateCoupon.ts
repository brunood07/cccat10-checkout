import CouponRepository from "../repository/CouponRepository";
export default class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string): Promise<boolean> {
    const coupon = await this.couponRepository.getCoupon(code);
    return !coupon.isExpired(new Date());
  }
}
