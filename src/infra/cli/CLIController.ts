import Checkout from "../../application/usecase/Checkout";
import CLIHandler from "./CLIHandler";

export default class CLIController {
  constructor(readonly handler: CLIHandler, readonly checkout: Checkout) {
    const input: Input = { cpf: "", items: [] };
    handler.on("set-cpf", function (params: any) {
      input.cpf = params;
    });
    handler.on("add-item", function (params: any) {
      const [product_id, quantity] = params.split(" ");
      input.items.push({
        product_id: parseInt(product_id),
        quantity: parseInt(quantity),
      });
    });
    handler.on("checkout", async function (params: any) {
      try {
        const output = await checkout.execute(input);
        handler.write(JSON.stringify(output));
      } catch (e: any) {
        handler.write(e.message);
      }
    });
  }
}

type Input = {
  cpf: string;
  items: { product_id: number; quantity: number }[];
  coupon?: string;
  from?: string;
  to?: string;
};
