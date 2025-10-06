
export class ProductError extends Error {
  constructor(message = "Product  Error") {
    super(message);
    this.name = "Product Error";
  }
}