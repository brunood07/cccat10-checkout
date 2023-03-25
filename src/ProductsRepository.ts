import Product from "./Product";

export default interface ProductsRepository {
  getProduct(id: number): Promise<Product>;
}
