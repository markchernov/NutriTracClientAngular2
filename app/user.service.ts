import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';



import 'rxjs/add/operator/toPromise';

import { User } from './user';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class UserService {

  static  loggedInUser: User;

  public getLoggedInUser <User> () {

   return UserService.loggedInUser;

  }

  private setLoggedInUser(user: User)   {

      console.log("user inside setLoggedInUser() " );
      console.log(user);
      
      UserService.loggedInUser = user; 

      return UserService.loggedInUser;

  }




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
 


  constructor(private http: Http,

  ) { };

  private toReturn: any;

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


  private pingJava(): Observable<any> {

    console.log("In service ping ");
    console.log("URL: " + this.pingUrl);

    return this.http.get(this.pingUrl, { headers: this.headersText })
      .map(this.extractDataText)
      .catch(this.handleError);
  }

  private ping(): Observable<any> {

    console.log("In service ping ");
    console.log("URL: " + this.pingUrl);

    return this.http.get(this.pingUrl, { headers: this.headersJSON, withCredentials: true })
      .map(this.extractDataJSON)
      .catch(this.handleError);
  }





    private extractDataJSON(res: Response) {
    console.log("Response: " + res);
    let body: any;
    if (res.text()) {

    body = res.json();

    }
    console.log("In service extractDataJSON() body: ");
    console.log(body);

    //UserService.loggedInUser = body || {};
    //this.setLoggedInUser(body);
    //console.log("this.getLoggedInUser()");
    //console.log(this.getLoggedInUser());

    return body || {};

  }




    private login(email: string, password: string): Observable<any> {

    console.log("URL: " + this.loginUrl);
    console.log("In service email: " + email + " password: " + password);
    let myBody = JSON.stringify({ email: email, password: password });
    console.log("myBody: " + myBody);

    return this.http.post(this.loginUrl, myBody, { headers: this.headersJSON }).map( this.extractDataJSON )
      .catch(this.handleError);

  }

   

    private getUser( email: string ): Observable<any> {

    console.log("URL: " + this.userUrl);
    console.log("In service getUser( email: string )   " + email );
    let url = `${this.userUrl}/${email}`;
    
    return this.http.get( url, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }






    private getUsers(): Observable<any> {

    console.log("URL: " + this.usersUrl);
    console.log("In service getUsers()");
  
    return this.http.get( this.usersUrl, { headers: this.headersJSON }).map( response  =>  { this.extractDataJSON })
      .catch(this.handleError)
      
      // .map(this.setLoggedInUser ).catch(this.handleError);

  }

   




    private createUser(
      
    //  email: string,firstName: string, lastName: string, birthdate: Date, password: string,
    //  sex: string, height: number, weight: number, active: number
    
    user : User
    
    ): Observable<any> {

    console.log("URL: " + this.loginUrl);
    console.log("In service createUser");
    let myBody = JSON.stringify( user );
    console.log("myBody: " + myBody);

    return this.http.post(this.userUrlCreate, myBody, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }




    private updateUser(user: User): Observable<any> {
    const url = `${this.userUrl}/${user.email}`;
    

    let myBody = JSON.stringify( user );
    console.log("myBody: " + myBody);

    return this.http.put( url, myBody, { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);
  }


    private deleteUser(email: string): Observable<any> {

    const url = `${this.userUrl}/${email}`;

    console.log("URL: " + this.userUrl);
    console.log("In service deleteUser(email: string): " + email );

    return this.http.delete(url , { headers: this.headersJSON }).map(this.extractDataJSON)
      .catch(this.handleError);

  }

}

