import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import Connection from "../../src/infra/database/Connection";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";
import ProductsRepository from "../../src/application/repository/ProductsRepository";

let connection: Connection;
let productsRepository: ProductsRepository;
let simulateFreight: SimulateFreight;

beforeEach(function () {
  connection = new PgPromiseAdapter();
  productsRepository = new ProductRepositoryDatabase(connection);
  simulateFreight = new SimulateFreight(productsRepository);
});

afterEach(async function () {
  await connection.close();
});

test("Simula o frete para um pedido com 3 itens", async function () {
  const input = {
    items: [
      { product_id: 1, quantity: 1 },
      { product_id: 2, quantity: 1 },
      { product_id: 3, quantity: 3 },
    ],
    from: "22060030",
    to: "88015600",
  };
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(280);
});
