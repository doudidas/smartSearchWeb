import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { environment } from 'src/environments/environment';


const defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa('admin:VMware1!') });

@Injectable()
export class ApiService {
    public reachable: boolean;
    public baseURL: string;



    constructor(private http: HttpClient) {
        this.reachable = false;
        if (environment.hasOwnProperty('apiBaseURL') && environment.apiBaseURL !== '') {
            this.baseURL = environment.apiBaseURL;
        } else {
            this.baseURL = window.location.origin + '/api/';
        }
    }



    public async checkHealth(): Promise<string> {
        console.log('checking api health...');
        return await this.http.get(this.baseURL + 'healthcheck', { headers: defaultHeaders }).toPromise().then(
            (response: HealthResponse) => {
                console.log(response);
                if (response.mongo === 'true') {
                    console.log('mongoDB: ok');
                    return null;
                } else {
                    console.error('mongoDB: ko');
                    return 'Limited access to resources : No DB connection on API side !! more details on log ';
                }
            },
            response => {
                console.error(response);
                return 'Backend disconnected: run on cache !';
            }
        );
    }
    public async get(uri: string, headers: HttpHeaders): Promise<any> {
        try {
            if (headers == null) {
                return this.http.get(uri, { headers: defaultHeaders }).toPromise();
            } else {
                if (!headers.has('Authorization')) {
                    headers.set('Authorization', defaultHeaders.get('Authorization'));
                }
                return this.http.get(uri, { headers }).toPromise();
            }
        } catch (error) {
            await this.handleError();
        }
    }

    public post(uri: string, body: object): any {
        return this.http.post(uri, body, { headers: defaultHeaders }).subscribe(res => res, error => { throw error; });
    }

    public put(uri: string, body: object): any {
        return this.http.put(uri, body, { headers: defaultHeaders }).subscribe(res => res, error => { throw error; });
    }

    public delete(uri: string) {
        return this.http.delete(uri, { headers: defaultHeaders }).toPromise().then(output => output, error => { throw error; });
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

class HealthResponse {
    constructor(
        public api: string,
        public mongo: string) { }
}
