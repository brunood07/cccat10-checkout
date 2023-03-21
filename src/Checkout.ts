import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import { validate } from "./validator";

export default class Checkout {
  async execute(input: Input): Promise<Output> {
    const isValid = validate(input.cpf);
    if (!isValid) throw new Error("Invalid cpf");
    const output: Output = {
      total: 0,
      freight: 0,
    };
    const items: number[] = [];
    if (input.items) {
      for (const item of input.items) {
        if (item.quantity <= 0) {
          throw new Error("Invalid quantity");
        }
        if (items.includes(item.product_id)) throw new Error("Duplicated Item");
        const productRepository = new ProductRepositoryDatabase();
        const productData = await productRepository.getProduct(item.product_id);
        if (
          productData.width <= 0 ||
          productData.height <= 0 ||
          productData.length <= 0 ||
          parseFloat(productData.weight) <= 0
        )
          throw new Error("Invalid dimension");
        output.total += parseFloat(productData.price) * item.quantity;
        const volume =
          ((((productData.width / 100) * productData.height) / 100) *
            productData.length) /
          100;
        const densidade = parseFloat(productData.weight) / volume;
        const itemFreight = 1000 * volume * (densidade / 100);
        output.freight += Math.max(itemFreight, 10) * item.quantity;
        items.push(item.product_id);
      }
    }
    if (input.coupon) {
      const couponRepository = new CouponRepositoryDatabase();
      const couponData = await couponRepository.getCoupon(input.coupon);
      if (couponData.expire_date.getTime() >= new Date().getTime()) {
        const percentage = parseFloat(couponData.percentage);
        output.total -= (output.total * percentage) / 100;
      }
    }
    if (input.from && input.to) {
      output.total += output.freight;
    }
    return output;
  }
}

type Input = {
  cpf: string;
  items: { product_id: number; quantity: number }[];
  coupon?: string;
  from?: string;
  to?: string;
};

type Output = {
  total: number;
  freight: number;
};
