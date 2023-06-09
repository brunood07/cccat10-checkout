import OrderRepository from "../repository/OrderRepository";

export default class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Output> {
    const order = await this.orderRepository.getById(id);
    const output: Output = {
      total: order.getTotal(),
      freight: order.freight,
      code: order.getCode(),
    };
    return output;
  }
}

type Output = {
  code: string;
  total: number;
  freight: number;
};
