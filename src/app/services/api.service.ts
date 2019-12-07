import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class ApiService {
    public reachable: boolean;
    public baseURL: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.reachable = false;
        if (environment.hasOwnProperty('apiBaseURL') && environment.apiBaseURL !== '') {
            this.baseURL = environment.apiBaseURL;
        } else {
            this.baseURL = window.location.origin + '/api/';
        }
        const hash = btoa(environment.username + ':' + environment.password);
        this.headers = defaultHeaders.set('Authorization', 'Basic ' + hash);
    }

    public async getDestinationDB() {
        return this.get('https://restcountries.eu/rest/v2/all', new HttpHeaders({ Accept: '*' }));
    }

    public async checkHealth(): Promise<string> {
        console.log('checking api health...');
        return await this.http.get(this.baseURL + 'healthcheck', { headers: this.headers }).toPromise().then(
            (response: HealthResponse) => {
                console.log(response);
                if (response.mongo === 'true') {
                    return null;
                } else {
                    return 'Limited access to resources : No DB connection on API side !! more details on log ';
                }
            },
            response => {
                console.error(this.headers);
                console.error(response);
                return 'Backend disconnected: run on cache !';
            }
        );
    }
    public async get(uri: string, headers: HttpHeaders): Promise<any> {
        try {
            if (headers == null) {
                return this.http.get(uri, { headers: this.headers }).toPromise();
            } else {
                if (!headers.has('Authorization')) {
                    headers.set('Authorization', this.headers.get('Authorization'));
                }
                return this.http.get(uri, { headers }).toPromise();
            }
        } catch (error) {
            this.handleError();
        }
    }

    public async post(uri: string, body: object): Promise<any> {
        return this.http.post(uri, body, { headers: this.headers }).toPromise();
    }

    public put(uri: string, body: object): any {
        return this.http.put(uri, body, { headers: this.headers }).subscribe(res => res, error => { throw error; });
    }

    public delete(uri: string) {
        return this.http.delete(uri, { headers: this.headers }).toPromise().then(output => output, error => { throw error; });
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
