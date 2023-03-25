import pgp from "pg-promise";
import Product from "./domain/entity/Product";
import ProductsRepository from "./ProductsRepository";

export default class ProductRepositoryDatabase implements ProductsRepository {
  async getProduct(product_id: number): Promise<Product> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    const [productData] = await connection.query(
      "select * from checkout.product where product_id = $1",
      [product_id]
    );
    await connection.$pool.end();
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
