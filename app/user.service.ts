import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';



import 'rxjs/add/operator/toPromise';

import { User } from './user';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class UserService {



  constructor(private http: Http,

  ) { };



  // STATIC


  private static loggedInUser: User;

  public static getLoggedInUser() {

    return UserService.loggedInUser;

  }

  public static setLoggedInUser(user: User) {

    console.log("user inside setLoggedInUser() ");
    console.log(user);

    UserService.loggedInUser = user;

  }

  // FIELDS

  private toReturn: any;

  private loggedInUser: User;

  public getLoggedInUser() {

    return this.loggedInUser;

  }

  public setLoggedInUser(user: User) {

    console.log("user inside setLoggedInUser() ");
    console.log(user);

    this.loggedInUser = user;

  }


  // HEADERS/URLS

  private headersJSON = new Headers({
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': 'true', 'Access-Control-Allow-Credentials': 'true',
  });

  private headersText = new Headers({ 'Content-Type': 'application/text' });

  private userUrl = 'https://nutritrac-server-markche.c9users.io/users/';  // URL to web
  private usersUrl = 'https://nutritrac-server-markche.c9users.io/users/users';  // URL to web api
  private loginUrl = 'https://nutritrac-server-markche.c9users.io/users/login';  // URL to web api
  private userUrlCreate = 'https://nutritrac-server-markche.c9users.io/users/new';
  private pingUrl = 'https://nutritrac-server-markche.c9users.io/ping/ping';  // URL to web api


  // METHODS

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    let myError = error;
    return myError;
  }

  private extractDataText(res: Response) {
    console.log("Response: " + res.text());
    let body = res.text();
    console.log("In service extractData() body: " + body);
    return body || {};
  }


  public pingJava(): Observable<any> {

    console.log("In service ping ");
    console.log("URL: " + this.pingUrl);

    return this.http.get(this.pingUrl, { headers: this.headersText })
      .map(this.extractDataText)
      .catch(this.handleError);
  }

  public ping(): Observable<any> {

    console.log("In service ping ");
    console.log("URL: " + this.pingUrl);

    return this.http.get(this.pingUrl, { headers: this.headersJSON, withCredentials: true })
      .map(this.extractDataJSON)
      .catch(this.handleError);
  }





  private extractDataJSON(res: Response): any {
    console.log("Response: " + res);
    let body: any;
    if (res.text()) {

      body = res.json();

    }
    console.log("In service extractDataJSON() body: ");
    console.log(body);
    // Works with static field
    //UserService.loggedInUser = body || {};

    // Works with static methods
    UserService.setLoggedInUser(body);
    console.log("UserService.loggedInUser");
    console.log(UserService.loggedInUser);

    console.log("UserService.getLoggedInUser()");
    console.log(UserService.getLoggedInUser());

    // Does not work with instance methods
    // this.setLoggedInUser(body);
    // console.log("this.loggedInUser");
    // console.log(this.loggedInUser);

    // console.log("this.getLoggedInUser()");
    // console.log(this.getLoggedInUser());


    return body || {};

  }




  public login(email: string, password: string): Observable<any> {

    console.log("URL: " + this.loginUrl);
    console.log("In service email: " + email + " password: " + password);
    let myBody = JSON.stringify({ email: email, password: password });
    console.log("myBody: " + myBody);

    return this.http.post(this.loginUrl, myBody, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }



  public getUser(email: string): Observable<any> {

    console.log("URL: " + this.userUrl);
    console.log("In service getUser( email: string )   " + email);
    let url = `${this.userUrl}/${email}`;

    return this.http.get(url, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }






  public getUsers(): Observable<any> {

    console.log("URL: " + this.usersUrl);
    console.log("In service getUsers()");

    return this.http.get(this.usersUrl, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError)

    // .map(this.setLoggedInUser ).catch(this.handleError);

  }






  public createUser(

    //  email: string,firstName: string, lastName: string, birthdate: Date, password: string,
    //  sex: string, height: number, weight: number, active: number

    user: User

  ): Observable<any> {

    console.log("URL: " + this.loginUrl);
    console.log("In service createUser");

    console.log("user");
    console.log(user);

    let myBody = JSON.stringify(user);
    console.log("myBody: " + myBody);

    return this.http.post(this.userUrlCreate, myBody, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }




  public updateUser(user: User): Observable<any> {
    const url = `${this.userUrl}/${user.email}`;


    let myBody = JSON.stringify(user);
    console.log("myBody: " + myBody);

    return this.http.put(url, myBody, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);
  }


  public deleteUser(email: string): Observable<any> {

    const url = `${this.userUrl}/${email}`;

    console.log("URL: " + this.userUrl);
    console.log("In service deleteUser(email: string): " + email);

    return this.http.delete(url, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }

}

