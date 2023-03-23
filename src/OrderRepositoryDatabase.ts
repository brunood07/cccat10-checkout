import pgp from "pg-promise";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryDatabase implements OrderRepository {
  async save(order: any): Promise<void> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    await connection.query(
      "insert into checkout.order (id_order, cpf, code, total, freight) values ($1, $2, $3, $4, $5)",
      [order.id_order, order.cpf, order.code, order.total, order.freight]
    );
    for (const item of order.items) {
      await connection.query(
        "insert into checkout.item (id_order, id_product, price, quantity) values ($1, $2, $3, $4)",
        [order.id_order, item.id_product, item.price, item.quantity]
      );
    }
    await connection.$pool.end();
  }

  async getById(id: string): Promise<any> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    const [orderData] = await connection.query(
      "select * from checkout.order where id_order = $1",
      [id]
    );
    await connection.$pool.end();
    return orderData;
  }

  async count(): Promise<number> {
    const connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
    const [options] = await connection.query(
      "select count(*) from checkout.order",
      []
    );
    await connection.$pool.end();
    return parseInt(options.count);
  }
}
