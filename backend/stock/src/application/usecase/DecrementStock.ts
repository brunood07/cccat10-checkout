import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepository from "../repository/StockEntryRepository";

export default class DecrementStock {
  constructor (readonly stockEntryRepository: StockEntryRepository) {}

  async execute (input: Input) {
    for (const item of input.items) {
      await this.stockEntryRepository.save(new StockEntry(item.product_id, "out", item.quantity));
    }
  }
}

type Input = { 
  items: {
    product_id: number, 
    quantity: number
  }[]
}