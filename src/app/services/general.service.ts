import { Injectable } from '@angular/core';

@Injectable()
export class GeneralService {

  constructor() { }

  public _delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
