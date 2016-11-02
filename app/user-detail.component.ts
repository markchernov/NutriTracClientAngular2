import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { User }         from './user';
import { UserService }  from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: [ 'user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit {
  user: User;
  errorMessage: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {


     this.route.params.forEach((params: Params) => {

      console.log('params');
      console.log(params);

      //let email = +params['email'];

      let email = params['email'];

      console.log('email');
      console.log(email);
      
      this.userService.getUser(email).subscribe(user  => this.user = <User>user,
                        error =>  this.errorMessage = <any>error,  

                       
                        // onComplete call
                        () => { 

                              console.log(this.user);
                                             
                         });
    });
  }

  goBack(): void {
    this.location.back();
  }

  saveUser(): void {
  this.userService.updateUser(this.user).subscribe(user  => this.user = <User>user,
                        error =>  this.errorMessage = <any>error,  

                       
                        // onComplete call
                        () => { 
                             
                              this.goBack();
                              console.log(this.user);
                                             
                         });
    };


}






