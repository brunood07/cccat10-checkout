export default class Item {
  constructor(
    readonly product_id: number,
    readonly price: number,
    readonly quantity: number,
    readonly currency: string
  ) {}
}
