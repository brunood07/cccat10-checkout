import pgp from "pg-promise";
import Connection from "./Connection";

export default class PgPromiseAdapter implements Connection {
  connection: any;

  constructor() {
    this.connection = pgp()(
      "postgres://docker:checkout@localhost:5432/checkout"
    );
  }

  async query(statements: string, params: any): Promise<any> {
    return this.connection.query(statements, params);
  }
  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
