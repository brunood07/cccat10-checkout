import StockEntryRepository from "../../src/application/repository/StockEntryRepository";
import CalculateStock from "../../src/application/usecase/CalculateStock";
import DecrementStock from "../../src/application/usecase/DecrementStock";
import StockEntry from "../../src/domain/entity/StockEntry";

test("Deve decrementar o estoque", async function() {
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
  const input = {
    items: [
      {
        product_id: 1,
        quantity: 10
      },
      {
        product_id: 2,
        quantity: 1
      },
      {
        product_id: 3,
        quantity: 3
      }
    ]
  };
  await decrementStock.execute(input);
  const calculateStock = new CalculateStock(stockEntryRepository);
  const output = await calculateStock.execute({ product_id: 1 });
  expect(output.total).toBe(10)
})