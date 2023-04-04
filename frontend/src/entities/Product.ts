import formatMoney from "../formatter/MoneyFormatter";

export default class Product {
  constructor(
    readonly product_id: number,
    readonly description: string,
    readonly price: number
  ) {}

  getFormattedPrice() {
    return formatMoney(this.price);
  }
}
