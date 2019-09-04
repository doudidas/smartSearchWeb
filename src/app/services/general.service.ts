import { Injectable } from '@angular/core';
// import { async } from '@angular/core/testing';

@Injectable()
export class GeneralService {

  constructor() { }

  public _delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
