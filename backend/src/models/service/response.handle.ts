export class ResponseHandle {
  message: string;
  isSuccessful: boolean;
  result: any;

  constructor(message: string, isSuccessful: boolean, result: any) {
    this.message = message;
    this.isSuccessful = isSuccessful;
    this.result = result;
  }
}
