import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { User }         from './user';
import { UserService }  from './user.service';

@Component({
  moduleId: module.id,
  selector: 'create-user',
  templateUrl: 'user-create.component.html',
  styleUrls: [ 'user-create.component.css' ]
})
export class UserCreateComponent implements OnInit {
  user: User;
  errorMessage: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.user = new User();

  }

  goBack(): void {
    this.location.back();
  }

  saveUser(): void {
  this.userService.createUser(this.user).subscribe(user  => this.user = <User>user,
                        error =>  this.errorMessage = <any>error,  

                       
                        // onComplete call
                        () => { 
                             
                              this.goBack();
                              console.log(this.user);
                                             
                         });
    };

}






