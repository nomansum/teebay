export class AuthenticationError extends Error {
  constructor(message = "Not Authenticated!") {
    super(message);
    this.name = "AuthenticationError";
  }
}