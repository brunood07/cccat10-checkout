import StockEntryRepository from "./application/repository/StockEntryRepository";
import CalculateStock from "./application/usecase/CalculateStock";
import DecrementStock from "./application/usecase/DecrementStock";
import StockEntry from "./domain/entity/StockEntry";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";

const stockEntries: StockEntry[] = [
  new StockEntry(1, "in", 20)
];
const stockEntryRepository: StockEntryRepository = {
  async save (stockEntry: StockEntry) {
    stockEntries.push(stockEntry);
  },
  async list (product_id: number) {
    return stockEntries.filter((stockEntry: StockEntry) => stockEntry.product_id === product_id)
  }
};
const decrementStock = new DecrementStock(stockEntryRepository);
const calculateStock = new CalculateStock(stockEntryRepository);
const connection = new PgPromiseAdapter();
const httpClient = new AxiosAdapter();
const httpServer = new ExpressAdapter();
new HttpController(httpServer, decrementStock, calculateStock);
httpServer.listen(3005);
