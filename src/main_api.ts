import Checkout from "./application/usecase/Checkout";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import CouponRepositoryDatabase from "./infra/repository/CouponRepositoryDatabase";
import CurrencyGatewayHttp from "./infra/gateway/CurrencyGatewayHttp";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "./infra/repository/ProductRepositoryDatabase";

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
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
new HttpController(httpServer, checkout);
httpServer.listen(3000);
