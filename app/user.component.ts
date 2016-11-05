import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { UserService } from './user.service';

import { FormsModule } from '@angular/forms';

//import {Pipe, PipeTransform} from '@angular/core';  // to iterate over object

// @Pipe({name: 'keys'})
//  export class KeysPipe implements PipeTransform {
//  transform(value: any) {
//    let keys:any = [];
//    for (let key in value) {
//       keys.push( {key: key, value: value[key]} );
//     }
//      return keys;
//   }
// }

@Component({
  moduleId: module.id,
  selector: 'my-user',
  templateUrl: 'user.component.html',
  styleUrls: [ 'user.component.css' ],
  
})
export class UsersComponent {
  users: User[];   
  pinged: string;
  errorMessage: string;
  selectedUser: User;
  deletedUser: Object;



  constructor(
    private router: Router,
    private userService: UserService) { }


   ping(): void {

    console.log("In component ping: "+ this.pinged);
    
    let returned = this.userService.ping().subscribe(pingedMessage => this.pinged = pingedMessage,
                        error =>  this.errorMessage = <any>error);
                    
    console.log("Returned in user.component.ts : ");
    console.log(returned);

   }




  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  goToUserDetail(): void {
    this.router.navigate(['/userdetail', this.selectedUser.email]);
  }

  goToCreateUser(): void {
    this.router.navigate(['/createuser']);
  }






  

  getUsers(): void {
    this.userService.getUsers().subscribe(users  => this.users = <User[]>users,
                        error =>  this.errorMessage = <any>error,  

                       
                        // onComplete call
                        () => { 

                              console.log(this.users);
                                             
                         });
  }



  delete(user: User): void {

  this.userService.deleteUser(user.email).subscribe(user  => this.deletedUser = <User>user,
                        error =>  this.errorMessage = <any>error,  

                       
                        // onComplete call
                        () => { 

                              let index = this.users.indexOf(user);

                              this.users.splice(index, 1);                        
                              console.log(this.deletedUser);
                                             
                         });
    };

}

