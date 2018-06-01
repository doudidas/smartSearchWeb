import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

const API_URL = "http://localhost:9000/api/";
@Injectable()
export class ApiService {
    public reachable: boolean;

    constructor (private http: HttpClient) {
      this.reachable = false;
    }

    public helloAPI(): boolean {
      let output: boolean;
            this.http.get(API_URL+"user").toPromise().then(() => {
                output =  true;
            }, error => {
                output = false;
            });
            return output;
    }


    public async get(uri: string, options: object): Promise<any> {
        try {
            return await this.http.get(API_URL + uri).toPromise().then(
                output => output,
                error => {throw error; }
                );
        } catch (error) {
            await this.handleError(error);
        }
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

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
