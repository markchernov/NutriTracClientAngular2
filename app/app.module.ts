// Beutify Alt Shift F

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import './rxjs-extensions';



// Imports for loading & configuring the in-memory web api  FOR TEST ONLY
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { Routing }              from './app.routing';


import { AppComponent }         from './app.component';


import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }   from './hero-search.component';

import { UsersComponent }       from './user.component';
import { UserService }          from './user.service';

import { MealsComponent }       from './meal.component';
import { MealService }          from './meal.service';

import { FoodsComponent }       from './food.component';
import { FoodService }          from './food.service';

import { LoginComponent }       from './login.component';
import { UserDetailComponent }  from './user-detail.component';
import { UserCreateComponent }  from './user-create.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
    Routing,  
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    UsersComponent,
    FoodsComponent,
    MealsComponent,
    LoginComponent,
    UserDetailComponent,
    UserCreateComponent
  ],
  providers: [
    HeroService,
    UserService,
    FoodService,
    MealService
  ],
  bootstrap: [ AppComponent]
})
export class AppModule {
}



