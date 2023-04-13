export default interface StockGateway {
  decrementStock (input: Input): Promise<void>;

}

export type Input = {
  items: {
    product_id: number;
    quantity: number
  }[]
}