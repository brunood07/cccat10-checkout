import Checkout from "../../application/usecase/Checkout";
import HttpServer from "./HttpServer";

export default class HttpController {
  constructor(readonly httpServer: HttpServer, readonly checkout: Checkout) {
    httpServer.on("post", "/checkout", async function (params: any, body: any) {
      const output = await checkout.execute(body);
      return output;
    });
  }
}
