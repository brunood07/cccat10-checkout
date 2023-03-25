import crypto from "node:crypto";
import Cpf from "./Cpf";
import CurrencyTable from "./CurrencyTable";
import Item from "./Item";
import Product from "./Product";

export default class Order {
  readonly items: Item[];
  readonly cpf: Cpf;
  readonly code: string;
  freight = 0;

  constructor(
    readonly id_order: string | undefined,
    cpf: string,
    readonly currencyTable: CurrencyTable = new CurrencyTable(),
    readonly sequence: number = 1,
    readonly date: Date = new Date()
  ) {
    if (!id_order) this.id_order = crypto.randomUUID();
    this.items = [];
    this.cpf = new Cpf(cpf);
    this.code = `${date.getFullYear()}${new String(sequence).padStart(8, "0")}`;
  }

  addItem(product: Product, quantity: number) {
    if (quantity <= 0) throw new Error("Invalid quantity");
    if (this.items.some((item: Item) => item.product_id === product.product_id))
      throw new Error("Duplicated Item");
    this.items.push(
      new Item(product.product_id, product.price, quantity, product.currency)
    );
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total +=
        item.price *
        item.quantity *
        this.currencyTable.getCurrency(item.currency);
    }
    total += this.freight;
    return total;
  }

  getCode() {
    return this.code;
  }
}
