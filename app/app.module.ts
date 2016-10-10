// Beutify Alt Shift F

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import './rxjs-extensions';



// Imports for loading & configuring the in-memory web api  FOR TEST ONLY
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { FoodService }          from './food.service';
import { routing }              from './app.routing';
import {HeroSearchComponent }   from './hero-search.component';
import { UserService }          from './user.service';
import { UsersComponent }       from './user.component';
import { FoodsComponent }       from './food.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
    routing,  
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    UsersComponent,
    FoodsComponent
  ],
  providers: [
    HeroService,
    UserService,
    FoodService
  ],
  bootstrap: [ AppComponent]
})
export class AppModule {
}



