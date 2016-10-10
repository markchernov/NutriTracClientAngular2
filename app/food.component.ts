import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Food } from './food';
import { FoodService } from './food.service';

@Component({
  moduleId: module.id,
  selector: 'my-food',
  templateUrl: 'food.component.html',
  styleUrls: [ 'food.component.css' ],
  
})
export class FoodsComponent {
  foods: Food[];
  selectedFood: Food;
  returnedFood: Food;
  errorMessage: string;
  values: string;

  constructor(
    private router: Router,
    private foodService: FoodService) { }


    getAllFoods(): void {

    console.log("In component getAllFoods ");
    
    this.foodService.getAllFoods().subscribe(foods => this.foods = foods,
                        error =>  this.errorMessage = <any>error);
                    
   }

    getFoodByNdbno(ndbno:string): void {

    console.log("In component getFoodByNdbno ");
    
    this.foodService.getFoodByNdbno(ndbno).subscribe(food => this.returnedFood = food,
                        error =>  this.errorMessage = <any>error);
                    
   }

   onKey(event:any) {
 
    this.foods = new Array<Food>();
    this.values = "";
    this.values += event.target.value;
    console.log(this.values);

    if(this.values.length >= 3) {

    this.foodService.getFoodByChar(this.values).subscribe(foods => {this.foods = foods
        
    console.log(this.foods)},
                        error =>  this.errorMessage = <any>error);

    }
  }




}

