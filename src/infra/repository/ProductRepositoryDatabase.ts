import Connection from "../database/Connection";
import Product from "../../domain/entity/Product";
import ProductsRepository from "../../application/repository/ProductsRepository";

export default class ProductRepositoryDatabase implements ProductsRepository {
  constructor(readonly connection: Connection) {}

  async getProduct(product_id: number): Promise<Product> {
    const [productData] = await this.connection.query(
      "select * from checkout.product where product_id = $1",
      [product_id]
    );
    return new Product(
      productData.product_id,
      productData.description,
      parseFloat(productData.price),
      productData.width,
      productData.height,
      productData.length,
      parseFloat(productData.weight),
      productData.currency
    );
  }
}
