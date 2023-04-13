import StockCalculator from "../../domain/entity/StockCalculator";
import StockEntryRepository from "../repository/StockEntryRepository";

export default class CalculateStock {
  constructor (readonly stockEntryRepository: StockEntryRepository) {}

  async execute (input: Input): Promise<Output> {
    
    const stockEntries = await this.stockEntryRepository.list(input.product_id);
    const total = StockCalculator.calculate(stockEntries);
    return { total };
  }
}

type Input = { 
    product_id: number;
}

type Output = {
  total: number;
}