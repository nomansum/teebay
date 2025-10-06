
export class AuthError extends Error {
  constructor(message = "Authentication Error") {
    super(message);
    this.name = "Auth Error";
  }
}