export default class Item {
  private quantity = 1;

  constructor(readonly product_id: number) {}

  incrementQuantity() {
    this.quantity++;
  }

  getQuantity() {
    return this.quantity;
  }
}
