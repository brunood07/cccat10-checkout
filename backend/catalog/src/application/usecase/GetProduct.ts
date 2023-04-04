import ProductsRepository from "../repository/ProductsRepository";

export default class GetProduct {
  constructor(readonly productRepository: ProductsRepository) {}

  async execute(product_id: number): Promise<Output> {
    const product = await this.productRepository.getProduct(product_id);
    const output = Object.assign(product, {
      volume: product.getVolume(),
      density: product.getDensity(),
    });
    return output;
  }
}

type Output = {
  product_id: number;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  currency: string;
  volume: number;
  density: number;
};
