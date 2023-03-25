import FreightCalculator from "../../domain/entity/FreightCalculator";
import ProductRepositoryDatabase from "../../ProductRepositoryDatabase";
import ProductsRepository from "../../ProductsRepository";

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
        const product = await this.productsRepository.getProduct(
          item.product_id
        );
        const itemFreight = FreightCalculator.calculate(product);
        output.freight += Math.max(itemFreight, 10) * item.quantity;
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
