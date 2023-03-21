import Checkout from "../src/Checkout";

let checkout: Checkout;

beforeEach(function () {
  checkout = new Checkout();
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
  const input = {
    cpf: "407.302.170-27",
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
  };
  const output = await checkout.execute(input);
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
