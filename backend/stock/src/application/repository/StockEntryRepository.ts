import StockEntry from "../../domain/entity/StockEntry";

export default interface StockEntryRepository {
  save (stockEntry: StockEntry): Promise<void>;
  list (product_id: number): Promise<StockEntry[]>;
}