import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Meal } from './meal';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MealService {

    private headersJSON = new Headers({
        'Content-Type': 'application/json',
    });

    private foodUrl = 'https://nutritrac-server-markche.c9users.io/foods';  // URL to web api
    private measureUrl = 'https://nutritrac-server-markche.c9users.io/measures';  // URL to web api
    private nutrientUrl = 'https://nutritrac-server-markche.c9users.io/nutrients';  // URL to web api

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
        console.log("Response Text: " + res.text());

        let body: any;
        if (res.text()) {
            console.log("in IF")
            body = res.json();
            console.log("In service extractDataJSON() body: ");
            console.log(body);
            return body || {};
        }
        
        else {
        return {'message': 'Response in not a JSON'};
        }
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
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }

    getFoodByChar(char: string): Observable<any> {
        const url = `${this.foodUrl}/search/${char}`;
        console.log("URL: " + url);
        return this.http
            .get(url, { headers: this.headersJSON })
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }

     getMeasureByFoodNdbno(ndbno: number): Observable<any> {
        const url = `${this.measureUrl}/${ndbno}`;
        console.log("URL: " + url);
        return this.http
            .get(url, { headers: this.headersJSON })
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }

    getMeasuresLabelsByFoodNdbno(ndbno: number): Observable<any> {
        const url = `${this.measureUrl}/labels/${ndbno}`;
        console.log("URL: " + url);
        return this.http
            .get(url, { headers: this.headersJSON })
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }


    getNutrientByFoodNdbno(ndbno: number):  Observable<any> {
        const url = `${this.nutrientUrl}/${ndbno}`;
        console.log("URL: " + url);
        return this.http
            .get(url, { headers: this.headersJSON })
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }



}

