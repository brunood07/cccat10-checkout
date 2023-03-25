import CouponRepository from "../../CouponRepository";
import CouponRepositoryDatabase from "../../CouponRepositoryDatabase";
import CurrencyGateway from "../../CurrencyGateway";
import CurrencyGatewayHttp from "../../CurrencyGatewayHttp";
import CurrencyTable from "../../domain/entity/CurrencyTable";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import Order from "../../domain/entity/Order";
import OrderRepository from "../../OrderRepository";
import OrderRepositoryDatabase from "../../OrderRepositoryDatabase";
import ProductRepositoryDatabase from "../../ProductRepositoryDatabase";
import ProductsRepository from "../../ProductsRepository";

export default class Checkout {
  constructor(
    readonly currencyGateway: CurrencyGateway = new CurrencyGatewayHttp(),
    readonly productsRepository: ProductsRepository = new ProductRepositoryDatabase(),
    readonly couponRepository: CouponRepository = new CouponRepositoryDatabase(),
    readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()
  ) {}

  async execute(input: Input): Promise<Output> {
    const currencies = await this.currencyGateway.getCurrencies();
    const currencyTable = new CurrencyTable();
    currencyTable.addCurrency("USD", currencies.usd);
    const sequence = await this.orderRepository.count();
    const order = new Order(
      input.uuid,
      input.cpf,
      currencyTable,
      sequence,
      new Date()
    );
    let freight = 0;
    if (input.items) {
      for (const item of input.items) {
        const product = await this.productsRepository.getProduct(
          item.product_id
        );
        order.addItem(product, item.quantity);
        const itemFreight = FreightCalculator.calculate(product);
        freight += Math.max(itemFreight, 10) * item.quantity;
      }
    }
    if (input.from && input.to) {
      order.freight += freight;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }
    let total = order.getTotal();
    await this.orderRepository.save(order);
    return {
      total,
      freight,
    };
  }
}

type Input = {
  uuid?: string;
  cpf: string;
  items: { product_id: number; quantity: number; price?: number }[];
  coupon?: string;
  from?: string;
  to?: string;
};

type Output = {
  total: number;
  freight?: number;
};
