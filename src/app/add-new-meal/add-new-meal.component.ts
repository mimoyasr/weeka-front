import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { NgModel, NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-new-meal',
  templateUrl: './add-new-meal.component.html',
  styleUrls: ['./add-new-meal.component.scss']
})
export class AddNewMealComponent {
categories:Array<object>;
mealData:object;
  constructor(private q:QueryService) {
    this.categories = [];
    this.mealData = {};
    this. getCategories()
   }

   getCategories():void{
    let path:string = '../../assets/categories.json';
    this.q.getData(path).subscribe(
      res => {
        this.categories = res;
        console.log(this.categories)
      },
      err => {
        console.log(err)
      }
    )
   }

   addNewMeal(data: NgForm): void {
    if (!data.valid) {
      console.log("error");
    }
    else {
      this.mealData = data.value;
      console.log(this.mealData);

    }
  }

}
