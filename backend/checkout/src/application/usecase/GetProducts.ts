import ProductsRepository from "../repository/ProductsRepository";

export default class GetProducts {
  constructor(readonly productRepository: ProductsRepository) {}

  async execute(): Promise<Output> {
    const output: Output = [];
    const products = await this.productRepository.getProducts();
    for (const product of products) {
      output.push({
        idProduct: product.product_id,
        description: product.description,
        price: product.price,
      });
    }
    return output;
  }
}

type Output = {
  idProduct: number;
  description: string;
  price: number;
}[];
