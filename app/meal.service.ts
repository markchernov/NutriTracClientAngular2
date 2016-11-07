import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Meal } from './meal';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MealService {

    private headersJSON = new Headers({
        'Content-Type': 'application/json',
    });

    private mealUrl = 'https://nutritrac-server-markche.c9users.io/meals/meals';  // URL to web api
   
    constructor(private http: Http,

    ) { };

    

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


    getAllMeals(): Observable<any> {

        console.log("URL: " + this.mealUrl);

        return this.http.get(this.mealUrl, { headers: this.headersJSON }).map(this.extractDataJSON)
            .catch(this.handleError);

    }


    getMealByChar(char: string): Observable<any> {
        const url = `${this.mealUrl}/search/${char}`;
        console.log("URL: " + url);
        return this.http
            .get(url, { headers: this.headersJSON })
            .map(this.extractDataJSON)
            .catch(this.handleError);
    }

    //  getMeasureByFoodNdbno(ndbno: number): Observable<any> {
    //     const url = `${this.measureUrl}/${ndbno}`;
    //     console.log("URL: " + url);
    //     return this.http
    //         .get(url, { headers: this.headersJSON })
    //         .map(this.extractDataJSON)
    //         .catch(this.handleError);
    // }

    // getMeasuresLabelsByFoodNdbno(ndbno: number): Observable<any> {
    //     const url = `${this.measureUrl}/labels/${ndbno}`;
    //     console.log("URL: " + url);
    //     return this.http
    //         .get(url, { headers: this.headersJSON })
    //         .map(this.extractDataJSON)
    //         .catch(this.handleError);
    // }


    // getNutrientByFoodNdbno(ndbno: number):  Observable<any> {
    //     const url = `${this.nutrientUrl}/${ndbno}`;
    //     console.log("URL: " + url);
    //     return this.http
    //         .get(url, { headers: this.headersJSON })
    //         .map(this.extractDataJSON)
    //         .catch(this.handleError);
    // }



}

