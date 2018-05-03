import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {HttpClient} from "@angular/common/http";
import {User} from "../class/user";

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

    public get(uri: string): any {
        this.http.get(API_URL + uri).toPromise().then(output => output, error => error);
    }
    public post(uri: string, body: Object): any {
        return this.http.post(API_URL + uri, body).subscribe(error => error, res => res);
    }
}
