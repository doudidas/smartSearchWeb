import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable ,  of } from "rxjs";

@Injectable()
export class ApiService {
    public reachable: boolean;

    constructor(private http: HttpClient) {
        this.reachable = false;
    }
    public async checkHealth(): Promise<string> {
        console.log("checking api health...");
        let errors = await this.http.get("api/ping", {responseType: 'text'} ).toPromise().then(
            success => {
                let reg = new RegExp("pong");
                console.log("api: ok");
                return reg.test(success) ? null : "invalid return ! " + success;
            }, error => {
                console.error("api: ko");
                return "Limited access to resources : Impossible to connect on  the API server ! ";
            });
            if (errors === null) {
                return await this.http.get("api/healthcheck").toPromise().then(
                    success => {
                        console.log("mongoDB: ok");
                        return null;
                    },
                    response => {
                        console.error("mongoDB: ko");
                        console.error(response.error.mongo.message);
                        return "Limited access to resources : No DB connection on API side !! more details on log ";
                    }
                )
            } else {
                return "unexpected error !";
            }
    }
    public async get(uri: string, headers: HttpHeaders): Promise<any> {
        try {
            if (headers == null) {
                return this.http.get(uri).toPromise();
            } else {
                return this.http.get(uri, { 'headers': headers}).toPromise();
            }
        } catch (error) {
            await this.handleError(error);
        }
    }

    public post(uri: string, body: Object): any {
        return this.http.post(uri, body).subscribe(res => res, error => { throw error; });
    }

    public put(uri: string, body: Object): any {
        return this.http.put(uri, body).subscribe(res => res, error => { throw error; });
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
