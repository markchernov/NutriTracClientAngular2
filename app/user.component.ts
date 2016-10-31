import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { Meal } from './meal';
import { UserService } from './user.service';

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
  selectedUser: User;
  pinged: string;
  errorMessage: string;
  selectedUserMeals: Meal[];

  @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private router: Router,
    private userService: UserService) { }


    login(email:string, password:string): void  {

       console.log("In component email: "+ email +" password: "+password);
       this.userService.login(email,password).subscribe(userObject => this.selectedUser = <User>userObject,
                        error =>  this.errorMessage = <any>error, 

                        // onComplete call
                        () => { this.userUpdated.emit(this.selectedUser);
                              console.log(this.selectedUser);
                                             
                         });

    }


   ping(): void {

    console.log("In component ping: "+ this.pinged);
    
    let returned = this.userService.ping().subscribe(pingedMessage => this.pinged = pingedMessage,
                        error =>  this.errorMessage = <any>error);
                    
    console.log("Returned in user.component.ts : ");
    console.log(returned);

   }




//   getHeroes(): void {
//     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
//   }

//   ngOnInit(): void {
//     this.getHeroes();
//   }

//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//   }

//   gotoDetail(): void {
//     this.router.navigate(['/detail', this.selectedHero.id]);
//   }

//   add(name: string): void {
//   name = name.trim();
//   if (!name) { return; }
//   this.heroService.create(name)
//     .then(hero => {
//       this.heroes.push(hero);
//       this.selectedHero = null;
//     });
// }

// delete(hero: Hero): void {
//   this.heroService
//       .delete(hero.id)
//       .then(() => {
//         this.heroes = this.heroes.filter(h => h !== hero);
//         if (this.selectedHero === hero) { this.selectedHero = null; }
//       });
// }

}

