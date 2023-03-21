import pgp from "pg-promise";

export default class ProductRepositoryDatabase {
  async getProduct(product_id: number): Promise<any> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    const [productData] = await connection.query(
      "select * from checkout.product where product_id = $1",
      [product_id]
    );
    await connection.$pool.end();
    return productData;
  }
}
