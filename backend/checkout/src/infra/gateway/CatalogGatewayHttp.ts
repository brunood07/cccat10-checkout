import CatalogGateway from "../../application/gateway/CatalogGateway";
import Product from "../../domain/entity/Product";
import HttpClient from "../http/HttpClient";

export default class CatalogGatewayHttp implements CatalogGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getProduct(product_id: number): Promise<Product> {
    const productData = await this.httpClient.get(
      `http://localhost:3003/products/${product_id}`
    );

    return new Product(
      productData.product_id,
      productData.description,
      productData.price,
      productData.width,
      productData.height,
      productData.length,
      productData.weight,
      productData.currency
    );
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get(
      "http://localhost:3003/products"
    );
    const products: Product[] = [];
    for (const productData of response) {
      products.push(
        new Product(
          productData.product_id,
          productData.description,
          productData.price,
          productData.width,
          productData.height,
          productData.length,
          productData.weight,
          productData.currency
        )
      );
    }
    return products;
  }
}
