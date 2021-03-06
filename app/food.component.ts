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
  measuresLabels: String [];
  selectedLabel: string;
  amountNumber: number;
  choosenNutrients: Nutrient[];
  

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

   
    /****************************************************************************************  

     FOOD

    *****************************************************************************************/
   
   
   
   
   
   
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

    if(foods.length >= 1)  

    {

    this.foods = foods;
    console.log(this.foods);
    this.foodCount = foods.length;

    }

    else
    {

      this.errorMessage = "Problem finding Food";

    }

  
    },
    error =>  this.errorMessage = <any>error);
    }
  }



  onSelectFood(food: Food): void {
    this.selectedFood = food;
    this.foods = null;
    
    this.getMeasuresByFoodNdbno(this.selectedFood);
    this.getNutrientsByFoodNdbno(this.selectedFood);
    this.getMeasuresLabelsByFoodNdbno(this.selectedFood);

  }


  onSelectNutrient(nutrient: Nutrient): void {

   this.selectedNutrient = nutrient;
   this.nutrients = null;
   
  }

   onSelectMeasure(measure: Measure): void {

  
    this.selectedMeasure = measure;
    this.measures = null;

  }


  addFoodToMeal()  {


   console.log("Food: "  + this.selectedFood + " added to meal ")


  }


    
    /****************************************************************************************  

     MEASURE

    *****************************************************************************************/




    getMeasuresByFoodNdbno(selectedFood:Food): void {

     let ndbno: number = selectedFood.ndbno;
     console.log("In component getMeasuresByFoodNdbno ");
    
     this.foodService.getMeasureByFoodNdbno(ndbno).subscribe(measures => this.measures = measures,
                        error =>  this.errorMessage = <string>error);
                    
    }

    getMeasuresLabelsByFoodNdbno(selectedFood:Food): void {

     let ndbno: number = selectedFood.ndbno;
     console.log("In component getMeasuresLabelsByFoodNdbno ");
    
     this.foodService.getMeasuresLabelsByFoodNdbno(ndbno).subscribe(labels => this.measuresLabels = labels,
                        error =>  this.errorMessage = <string>error);
                    
    }



   /****************************************************************************************  

     NUTRIENT

    *****************************************************************************************/



    getNutrientsByFoodNdbno(selectedFood:Food): void {

    let ndbno: number = this.selectedFood.ndbno;
  
    this.foodService.getNutrientByFoodNdbno(ndbno).subscribe(nutrients => this.nutrients = nutrients,
                        error =>  this.errorMessage = <string>error);    
  }



    onAmount(): void {
 
    if( this.amountNumber && this.selectedLabel )  {

    this.choosenNutrients = new Array();  

    console.log("onAmount()");
    // loop thru all measures 
    this.measures.forEach(measure => {

      console.log("Inside this.measures.forEach");
      // if labels are the same
      if(measure.label == this.selectedLabel) {

         console.log("Inside if(measure.label == this.selectedLabel) ");
         //console.log(this.selectedLabel);  

         console.log(measure);
          // loop thru all nutrients
          this.nutrients.forEach(nutrient => {
            
                //console.log("Inside this.nutrients.forEach");
                console.log(nutrient);
                // if nutrient PK is linked to measure by FK 
                if(nutrient.id == measure.nutrient_id)  {
                     // save it to new array

                      console.log(nutrient);
                      console.log("if(nutrient.nutrient_id === measure.nutrient_id) ")
                      console.log(nutrient.nutrient_id);
                     // save it times the number of amount of selectedMeasure 
                     for(let i = 0; i < this.amountNumber; i++)  {

                          this.choosenNutrients.push( nutrient );

                     }
                }
          });
  
          // this.nutrients.filter(nutrient => 
          // nutrient.nutrient_id === this.selectedMeasure.nutrient_id )      

      }   // end inner loop

      console.log(this.choosenNutrients);
      
    });   // end outer loop

    // calculate

    }  // end if both this.amountNumber && this.selectedLabel

  }  // end on Amount()







}  // end class

