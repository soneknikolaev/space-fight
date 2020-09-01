export class RuntimeException extends Error {
  constructor(message = 'Runtime exception') {
    super(message);

    this.name = this.constructor.name;
  }
}
