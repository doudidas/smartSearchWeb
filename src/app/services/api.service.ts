import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const API_URL = "http://spacelama-api:9000/api";
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

    public get(uri: string, options: object): any {
        if (options == null) {
            return this.http.get(API_URL + uri).toPromise().then(output => output, error => {throw error; });
        }  else {
            return this.http.get(API_URL + uri, options).toPromise().then(output => output, error => {throw error; });
        }
    }
    public post(uri: string, body: Object): any {
        return this.http.post(API_URL + uri, body).subscribe(res => res, error => {throw error; });
    }
    public delete(uri: string) {
        return this.http.delete(API_URL + uri).toPromise().then(output => output, error => {throw error; });
    }
}
