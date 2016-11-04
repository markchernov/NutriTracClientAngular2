import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ],
  
})




  export class LoginComponent {

  @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();    
   
  private selectedUser: User;
  private loggedInUser: User;
  private errorMessage: any;



  constructor(

    private userService: UserService) { }


    login(email:string, password:string): void  {

       console.log("In component email: "+ email +" password: "+password);
       this.userService.login(email,password).subscribe(userObject => this.selectedUser = <User>userObject,
                        error =>  this.errorMessage = <any>error, 

                       
                        // onComplete call
                        () => { this.userUpdated.emit(this.selectedUser);
                              console.log("this.selectedUser  emited from login.component.ts    ");
                              console.log(this.selectedUser);
                              
                              console.log("this.loggedInUser after getLoggInUser() login.component.ts    ");
                              console.log(this.loggedInUser = this.userService.getLoggedInUser());

                                             
                         });

    }
}
