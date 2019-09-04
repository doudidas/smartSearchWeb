import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiService {
    public reachable: boolean;

    constructor(private http: HttpClient) {
        this.reachable = false;
    }
    public async checkHealth(): Promise<string> {
        console.log('checking api health...');
        return await this.http.get('api/healthcheck').toPromise().then(
            (response: HealthResponse) => {
                console.log(response);
                if (response.mongo === true) {
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
                return this.http.get(uri).toPromise();
            } else {
                return this.http.get(uri, { headers }).toPromise();
            }
        } catch (error) {
            await this.handleError();
        }
    }

    public post(uri: string, body: object): any {
        return this.http.post(uri, body).subscribe(res => res, error => { throw error; });
    }

    public put(uri: string, body: object): any {
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
    public api: boolean,
    public mongo: boolean) {}
}
