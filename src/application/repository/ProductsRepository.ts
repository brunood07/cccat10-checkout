import Product from "../../domain/entity/Product";

export default interface ProductsRepository {
  getProduct(id: number): Promise<Product>;
}
