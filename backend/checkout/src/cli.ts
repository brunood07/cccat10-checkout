import Checkout from "./application/usecase/Checkout";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";

process.stdin.on("data", async function (chunk) {
  const command = chunk.toString().replace(/\n/g, "");
  const input: Input = { cpf: "", items: [] };
  if (command.startsWith("set-cpf")) {
    input.cpf = command.replace("set-cpf ", "");
  }
  if (command.startsWith("add-item")) {
    const [product_id, quantity] = command.replace("add-item ", "").split(" ");
    input.items.push({
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
    });
  }

  console.log(input);
  if (command.startsWith("checkout")) {
    try {
      const connection = new PgPromiseAdapter();
      const httpClient = new AxiosAdapter();
      const currencyGateway = new CurrencyGatewayHttp(httpClient);
      const productsRepository = new ProductRepositoryDatabase(connection);
      const couponRepository = new CouponRepositoryDatabase(connection);
      const orderRepository = new OrderRepositoryDatabase(connection);
      const checkout = new Checkout(
        currencyGateway,
        productsRepository,
        couponRepository,
        orderRepository
      );
      const output = await checkout.execute(input);
      console.log(output);
    } catch (e: any) {
      console.log(e.message);
    }
  }
});

type Input = {
  cpf: string;
  items: { product_id: number; quantity: number }[];
  coupon?: string;
  from?: string;
  to?: string;
};
