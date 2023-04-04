import GetProduct from "../../src/application/usecase/GetProduct";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

test("Deve listar os produtos", async function () {
  const connection = new PgPromiseAdapter();
  const productsRepository = new ProductRepositoryDatabase(connection);
  const getProducts = new GetProduct(productsRepository);
  const output = await getProducts.execute(1);
  expect(output.product_id).toBe(1);
  expect(output.description).toBe("A");
  expect(output.price).toBe(1000);
  expect(output.volume).toBe(0.03);
  expect(output.density).toBe(0.01);
  await connection.close();
});
