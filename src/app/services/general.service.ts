import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';


@Injectable()
export class GeneralService {
  private destinationDB: any[];

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
