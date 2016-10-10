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
  selectedFood: any;
  returnedFood: any;
  errorMessage: string;

  constructor(
    private router: Router,
    private foodService: FoodService) { }




    getAllFoods(): void {

    console.log("In component getAllFoods ");
    
    let returned = this.foodService.getAllFoods().subscribe(foods => this.foods = foods,
                        error =>  this.errorMessage = <any>error);
                    
    console.log("Returned in food.component.ts : ");
    console.log(returned);

   }

    getFoodByNdbno(ndbno:string): void {

    console.log("In component getFoodByNdbno ");
    
    let returned = this.foodService.getFoodByNdbno(ndbno).subscribe(food => this.returnedFood = food,
                        error =>  this.errorMessage = <any>error);
                    
    console.log("Returned in food.component.ts : ");
    console.log(returned);

   }

}

