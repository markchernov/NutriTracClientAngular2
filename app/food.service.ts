import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Food } from './food';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class FoodService {

    private headersJSON = new Headers({
        'Content-Type': 'application/json',
    });

    private foodUrl = 'https://nutritrac-server-markche.c9users.io/foods';  // URL to web api

    constructor(private http: Http,

    ) { };

    private toReturn: any;

    private handleError(error: any) {
        console.error('An error occurred', error); // for demo purposes only
        let myError = error;
        return myError;
    }

    private extractDataJSON(res: Response) {
        console.log("Response: " + res);
        let body: any;
        if (res.text()) {
            body = res.json();
        }
        console.log("In service extractDataJSON() body: ");
        console.log(body);

        return body || {};
    }



    getAllFoods(): Observable<any> {

        console.log("URL: " + this.foodUrl);

        return this.http.get(this.foodUrl, { headers: this.headersJSON }).map(this.extractDataJSON)
            .catch(this.handleError);

    }

    getFoodByNdbno(ndbno: string): Observable<any> {
        const url = `${this.foodUrl}/${ndbno}`;
        console.log("URL: " + url);
        return this.http
            .get(url, { headers: this.headersJSON })
            .map(() => this.extractDataJSON)
            .catch(this.handleError);
    }
}

