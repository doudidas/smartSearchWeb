import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {HttpClient} from "@angular/common/http";

const API_URL = environment.apiUrl;
@Injectable()
export class ApiService {
    private url: string;

    constructor(
        private http: HttpClient
    ) {
    }

    public helloAPI() {
        this.http.get(API_URL).toPromise().then(() => true, error => {
            console.log(error);
            return false;
        });
    }
    public changeAPIUrl(newUrl: string) {
        this.url = newUrl;
    }
}
