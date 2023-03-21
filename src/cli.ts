import Checkout from "./Checkout";

process.stdin.on("data", async function (chunk) {
  const command = chunk.toString();
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
      const checkout = new Checkout();
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
