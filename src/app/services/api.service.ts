import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { RequestOptions } from 'http';


@Injectable()
export class ApiService {
    public reachable: boolean;

    constructor(private http: HttpClient) {
        this.reachable = false;
    }

    public async helloAPI(): Promise<boolean> {
        return this.http.get("api/user").toPromise().then(users => {
            return true;
        }, error => {
            return false;
        });
    }

    public async getLoremIpsum(): Promise<string> {

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'text/plain');
        // headers.set('Access-Control-Allow-Origin', '*');
        return this.get('/lorem', headers);
    }

    public async get(uri: string, headers: HttpHeaders): Promise<any> {
        try {
            if (headers == null) {
                return this.http.get(uri).toPromise();
            } else {
                return this.http.get(uri, { 'headers': headers }).toPromise();
            }
        } catch (error) {
            await this.handleError(error);
        }
    }

    public post(uri: string, body: Object): any {
        return this.http.post(uri, body).subscribe(res => res, error => { throw error; });
    }

    public delete(uri: string) {
        return this.http.delete(uri).toPromise().then(output => output, error => { throw error; });
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
