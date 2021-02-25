import { Injectable } from '@angular/core';

@Injectable()
export class GeneralService {
  private destinationDB: any[];

  constructor() { }

  public _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
