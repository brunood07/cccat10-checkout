import CouponRepository from "./CouponRepository";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import CurrencyGateway from "./CurrencyGateway";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import FreightCalculator from "./FreightCalculator";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import ProductsRepository from "./ProductsRepository";
import { validate } from "./validator";

export default class ValidateCoupon {
  constructor(
    readonly couponRepository: CouponRepository = new CouponRepositoryDatabase()
  ) {}

  async execute(code: string): Promise<boolean> {
    const couponData = await this.couponRepository.getCoupon(code);
    return couponData.expire_date.getTime() >= new Date().getTime();
  }
}
