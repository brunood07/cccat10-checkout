export default interface ProductsRepository {
  getProduct(id: number): Promise<any>;
}
