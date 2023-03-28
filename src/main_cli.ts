import Checkout from "./application/usecase/Checkout";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import CLIController from "./infra/cli/CLIController";
import CLIHandlerNode from "./infra/cli/CLIHandlerNode";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";

const handler = new CLIHandlerNode();
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
new CLIController(handler, checkout);
