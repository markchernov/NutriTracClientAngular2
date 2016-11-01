import { Component, Input } from '@angular/core';
import { UsersComponent } from './user.component';
import { User } from './user';



@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],

})


export class AppComponent {
  title = 'NutriTrac Foods App';
  
  constructor() {}


   selectedUserName: User;
   name: string;
   
   
   userUpdated(user: User) {

   console.log("userUpdated")
   this.selectedUserName = user;
   this.name = this.selectedUserName.firstName;
   console.log(this.name);

   }

}
