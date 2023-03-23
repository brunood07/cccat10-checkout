import Sinon from "sinon";
import crypto from "node:crypto";
import Checkout from "../src/Checkout";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import CurrencyGateway from "../src/CurrencyGateway";
import CurrencyGatewayHttp from "../src/CurrencyGatewayHttp";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import ProductsRepository from "../src/ProductsRepository";
import GetOrder from "../src/GetOrder";
import OrderRepositoryDatabase from "../src/OrderRepositoryDatabase";

let checkout: Checkout;
let getOrder: GetOrder;

beforeEach(function () {
  checkout = new Checkout();
  getOrder = new GetOrder();
});

test("Não deve aceitar um pedido com cpf inválido", async function () {
  const input = {
    cpf: "406.302.170-27",
    items: [],
  };
  expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid cpf")
  );
});

test("Deve criar um pedido vazio", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(0);
});

test("Deve criar um pedido com 3 produtos", async function () {
  const uuid = crypto.randomUUID();
  const input = {
    uuid,
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
  };
  await checkout.execute(input);
  const output = await getOrder.execute(uuid);
  expect(output.total).toBe(6090);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(4872);
});

test("Deve criar um pedido com 3 produtos com cupom de desconto expirado", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
    coupon: "VALE10",
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(6090);
});

test("Não deve criar um pedido com quantidade negativa", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 1, quantity: -1 }],
  };
  expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid quantity")
  );
});

test("Não deve criar um pedido com item duplicado", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 1, quantity: 1 },
    ],
  };
  expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Duplicated Item")
  );
});

test("Deve criar um pedido com 1 produtos calculando o frete", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 1, quantity: 3 }],
    from: "22060030",
    to: "88015600",
  };
  const output = await checkout.execute(input);
  expect(output.freight).toBe(90);
  expect(output.total).toBe(3090);
});

test("Não deve criar um pedido se o produto tiver alguma dimensão negativa", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 4, quantity: 1 }],
  };
  expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid dimension")
  );
});

test("Deve criar um pedido com 1 produto calculando o frete com valor mínimo", async function () {
  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 3, quantity: 1 }],
    from: "22060030",
    to: "88015600",
  };
  const output = await checkout.execute(input);
  expect(output.freight).toBe(10);
  expect(output.total).toBe(40);
});

test("Deve criar um pedido com 1 produto em dólar usando um stub", async function () {
  const stubCurrencyGateway = Sinon.stub(
    CurrencyGatewayHttp.prototype,
    "getCurrencies"
  ).resolves({
    usd: 3,
  });
  const stubProductRepository = Sinon.stub(
    ProductRepositoryDatabase.prototype,
    "getProduct"
  ).resolves({
    product_id: 5,
    description: "A",
    price: 1000,
    width: 10,
    height: 10,
    length: 10,
    weight: 10,
    currency: "USD",
  });

  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 5, quantity: 1 }],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(3000);
  stubCurrencyGateway.restore();
  stubProductRepository.restore();
});

test("Deve criar um pedido com 3 produtos com cupom de desconto com um spy", async function () {
  const spyProductRepository = Sinon.spy(
    ProductRepositoryDatabase.prototype,
    "getProduct"
  );
  const spyCouponRepository = Sinon.spy(
    CouponRepositoryDatabase.prototype,
    "getCoupon"
  );
  const input = {
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(4872);
  expect(spyCouponRepository.calledOnce).toBeTruthy();
  expect(spyCouponRepository.calledWith("VALE20")).toBeTruthy();
  expect(spyProductRepository.calledThrice).toBeTruthy();
  spyCouponRepository.restore();
  spyProductRepository.restore();
});

test("Deve criar um pedido com 1 produto em dólar usando um mock", async function () {
  const mockCurrencyGateway = Sinon.mock(CurrencyGatewayHttp.prototype);
  mockCurrencyGateway.expects("getCurrencies").once().resolves({
    usd: 3,
  });
  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 5, quantity: 1 }],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(3000);
  mockCurrencyGateway.verify();
  mockCurrencyGateway.restore();
});

test("Deve criar um pedido com 1 produto em dólar usando um fake", async function () {
  const currencyGateway: CurrencyGateway = {
    async getCurrencies(): Promise<any> {
      return {
        usd: 3,
      };
    },
  };
  const productsRepository: ProductsRepository = {
    async getProduct(): Promise<any> {
      return {
        product_id: 6,
        description: "A",
        price: 1000,
        width: 10,
        height: 10,
        length: 10,
        weight: 10,
        currency: "USD",
      };
    },
  };

  checkout = new Checkout(currencyGateway, productsRepository);

  const input = {
    cpf: "407.302.170-27",
    items: [{ product_id: 6, quantity: 1 }],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(3000);
});

test("Deve criar um pedido e verificar o código de série do pedido", async function () {
  const stub = Sinon.stub(OrderRepositoryDatabase.prototype, "count").resolves(
    1
  );
  const uuid = crypto.randomUUID();
  const input = {
    uuid,
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
  };
  await checkout.execute(input);
  const output = await getOrder.execute(uuid);
  expect(output.code).toBe("202300000001");
  stub.restore();
});
