import { Injectable } from '@angular/core';


@Injectable()
export class GeneralService {

  constructor() { }

  public _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public encrypt(value: string) {
    // const hash = createHash('sha512');
    // hash.update(value);
    // return hash.digest('hex');
    return value;
  }
}
