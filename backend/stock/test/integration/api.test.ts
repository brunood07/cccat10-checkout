import axios from "axios";

test("Deve decrementar o estoque pela api", async function () {
  const input = {
    items: [
      {
        product_id: 1,
        quantity: 10
      },
      {
        product_id: 2,
        quantity: 1
      },
      {
        product_id: 3,
        quantity: 3
      }
    ]
  };
  await axios.post('http://localhost:3005/decrementStock', input);
  const response = await  axios.post('http://localhost:3005/calculateStock', { product_id: 1 });
  const output = response.data;
  expect(output.total).toBe(10);
});