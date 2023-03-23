import SimulateFreight from "../src/SimulateFreight";

let simulateFreight: SimulateFreight;

beforeEach(function () {
  simulateFreight = new SimulateFreight();
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
