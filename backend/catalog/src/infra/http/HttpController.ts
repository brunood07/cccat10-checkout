import GetProduct from "../../application/usecase/GetProduct";
import GetProducts from "../../application/usecase/GetProducts";
import HttpServer from "./HttpServer";

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getProduct: GetProduct,
    readonly getProducts: GetProducts
  ) {
    httpServer.on(
      "get",
      "/products/:product_id",
      async function (params: any, body: any) {
        const output = await getProduct.execute(params.product_id);
        return output;
      }
    );

    httpServer.on("get", "/products", async function (params: any, body: any) {
      const output = await getProducts.execute();
      return output;
    });
  }
}
