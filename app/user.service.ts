import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';



import 'rxjs/add/operator/toPromise';

import { User } from './user';

import { Observable }     from 'rxjs/Observable';



@Injectable()
export class UserService {

private headersJSON = new Headers({'Content-Type': 'application/json'});   
private headersText = new Headers({'Content-Type': 'application/text'}); 




private userUrl = 'http://markche.com:8080/NutriTrac/rest/login';  // URL to web api
private pingUrl = 'http://markche.com:8080/NutriTrac/rest/ping';  // URL to web api
private testUrl = 'http://jsonplaceholder.typicode.com/posts/1';  // URL to web api


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


  ping (): Observable<any> {

    console.log("In service ping ");
    console.log("URL: " + this.pingUrl);

    return this.http.get(this.pingUrl, {headers: this.headersText})
                     .map(this.extractDataText)
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

    return body || {};
  }



 login(email:string, password:string): Observable<any> {
  
    console.log("URL: " + this.userUrl);
    console.log("In service email: " + email + " password: " + password);
    let myBody = JSON.stringify({email: email, password: password});
    console.log("myBody: " + myBody);

    return this.http.post(this.userUrl, myBody,{headers: this.headersJSON} ).map(this.extractDataJSON)
                     .catch(this.handleError);
            
  }





update(user: User): Promise<User> {
  const url = `${this.userUrl}/${user.email}`;
  return this.http
    .put(url, JSON.stringify(user), {headers: this.headersJSON})
    .toPromise()
    .then(() => user)
    .catch(this.handleError);
}


create(name: string): Promise<User> {
  return this.http
    .post(this.userUrl, JSON.stringify({name: name}), {headers: this.headersJSON})
    .toPromise()
    .then(res => res.json().data)
    .catch(this.handleError);
}

delete(id: number): Promise<void> {
  const url = `${this.userUrl}/${id}`;
  return this.http.delete(url, {headers: this.headersJSON})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}





}

