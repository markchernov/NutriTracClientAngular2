import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Food } from './food';
import { FoodService } from './food.service';
import { Measure } from './measure';
import { Nutrient } from './nutrient';

@Component({
  moduleId: module.id,
  selector: 'my-food',
  templateUrl: 'food.component.html',
  styleUrls: [ 'food.component.css' ],
  
})
export class FoodsComponent {
  foods: Food[];
  selectedFood: Food;
  errorMessage: string;
  values: string;
  foodCount:number;
  measures: Measure[];
  selectedMeasure: Measure;
  nutrients: Nutrient[];
  selectedNutrient: Nutrient;


  constructor(
    private router: Router,
    private foodService: FoodService) { }


  //   getAllFoods(): void {

  //   console.log("In component getAllFoods ");
    
  //   this.foodService.getAllFoods().subscribe(foods => this.foods = foods,
  //                       error =>  this.errorMessage = <any>error);
                    
  //  }

  //   getFoodByNdbno(ndbno:string): void {

  //   console.log("In component getFoodByNdbno ");
    
  //   this.foodService.getFoodByNdbno(ndbno).subscribe(food => this.returnedFood = food,
  //                       error =>  this.errorMessage = <any>error);
                    
  //  }

   onKey(event:any) {
    
    
    this.values = "";
    this.values += event.target.value;
    console.log(this.values);

    if(this.values.length >= 3) {


    this.foodCount = 0;
    this.foods = null;
    this.selectedMeasure = null;
    this.selectedFood = null;
    

    this.foodService.getFoodByChar(this.values).subscribe(foods => {
    this.foods = foods;
    console.log(this.foods);
    this.foodCount = foods.length;
  
    },
    error =>  this.errorMessage = <any>error);
    }
  }

    onSelectFood(food: Food): void {
    this.selectedFood = food;
    this.foods = null;
    
    //this.getMeasuresByFoodNdbno(this.selectedFood);
    this.getNutrientsByFoodNdbno(this.selectedFood);

  }


    onSelectNutrient(nutrient: Nutrient): void {
    this.selectedNutrient = nutrient;
    this.nutrients = null;
   
    this.getMeasuresByFoodNdbno(this.selectedFood);


  }









    getMeasuresByFoodNdbno(selectedFood:Food): void {

     let ndbno: number = selectedFood.ndbno;
     console.log("In component getFoodByNdbno ");
    
     this.foodService.getMeasureByFoodNdbno(ndbno).subscribe(measures => this.measures = measures,
                        error =>  this.errorMessage = <string>error);
                    
    }

    getNutrientsByFoodNdbno(selectedFood:Food): void {

    let ndbno: number = this.selectedFood.ndbno;
  
    this.foodService.getNutrientByFoodNdbno(ndbno).subscribe(nutrients => this.nutrients = nutrients,
                        error =>  this.errorMessage = <string>error);

    
  }


}

