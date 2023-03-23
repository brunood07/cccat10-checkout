import FreightCalculator from "./FreightCalculator";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import ProductsRepository from "./ProductsRepository";
import { validate } from "./validator";

export default class SimulateFreight {
  constructor(
    readonly productsRepository: ProductsRepository = new ProductRepositoryDatabase()
  ) {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      freight: 0,
    };
    if (input.items) {
      for (const item of input.items) {
        const productData = await this.productsRepository.getProduct(
          item.product_id
        );
        const volume =
          ((((productData.width / 100) * productData.height) / 100) *
            productData.length) /
          100;
        const density = parseFloat(productData.weight) / volume;
        const itemFreight = 1000 * volume * (density / 100);
        output.freight += Math.max(itemFreight, 10) * item.quantity;
        item.price = parseFloat(productData.price);
      }
    }
    return output;
  }
}

type Input = {
  items: { product_id: number; quantity: number; price?: number }[];
  from?: string;
  to?: string;
};

type Output = {
  freight: number;
};
