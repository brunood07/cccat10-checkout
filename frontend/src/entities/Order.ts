import Item from "./Item";
import Product from "./Product";

export default class Order {
  items: Item[];
  total = 0;

  constructor(readonly cpf: string) {
    this.items = [];
  }

  addItem(product: Product) {
    const existingItem = this.items.find(
      (item: Item) => item.product_id === product.product_id
    );
    if (existingItem) {
      existingItem.incrementQuantity();
    } else {
      this.items.push(new Item(product.product_id));
    }
    this.total += product.price;
  }
}
