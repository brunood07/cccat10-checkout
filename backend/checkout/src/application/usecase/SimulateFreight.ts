import FreightGatewayHttp from "../../infra/gateway/FreightGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import FreightGateway, {
  Input as FreightInput,
} from "../gateway/FreightGateway";
import ProductsRepository from "../repository/ProductsRepository";

export default class SimulateFreight {
  constructor(
    readonly productsRepository: ProductsRepository,
    readonly freightGateway: FreightGateway = new FreightGatewayHttp(
      new AxiosAdapter()
    )
  ) {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      freight: 0,
    };
    const freightInput: FreightInput = { items: [] };
    if (input.items) {
      for (const item of input.items) {
        const product = await this.productsRepository.getProduct(
          item.product_id
        );
        freightInput.items.push({
          width: product.width,
          height: product.height,
          length: product.length,
          weight: product.weight,
          quantity: item.quantity,
        });
      }
    }
    const freightOutput = await this.freightGateway.calculateFreight(
      freightInput
    );
    output.freight = freightOutput.freight;
    return output;
  }
}

type Input = {
  items: { product_id: number; quantity: number; price?: number }[];
  from?: string;
  to?: string;
};

type Output = {
  freight: number;
};
