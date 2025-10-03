
export class DatabaseError extends Error {
  constructor(message = "Error Occurred while interacting with DB!") {
    super(message);
    this.name = "DatabaseError";
  }
}