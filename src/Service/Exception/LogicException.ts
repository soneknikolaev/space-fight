import { RuntimeException } from './RuntimeException';

export class LogicException extends RuntimeException {
  constructor(message = 'Logic exception') {
    super(message);
  }
}
