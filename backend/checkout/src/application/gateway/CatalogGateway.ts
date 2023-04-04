import Product from "../../domain/entity/Product";

export default interface CatalogGateway {
  getProduct(product_id: number): Promise<Product>;
  getProducts(): Promise<Product[]>;
}
