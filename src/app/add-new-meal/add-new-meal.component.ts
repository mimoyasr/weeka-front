import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { NgxCropperOption } from 'ngx-cropper';
import {  HttpHeaders } from '@angular/common/http';

//=========== services ================
import { QueryService } from '../query.service';

@Component({
  selector: 'app-add-new-meal',
  templateUrl: './add-new-meal.component.html',
  styleUrls: ['./add-new-meal.component.scss']
})
export class AddNewMealComponent {
 public ngxCropperConfig: NgxCropperOption;

  onFileSelcted(event){
    console.log(event)
  }  
categories:Array<object>;
mealData:object;
afterPercentage:number;
  constructor(private q:QueryService) {
    this.categories = [];
    this.mealData = {};
    this. getCategories()
    this.afterPercentage = 0

   }



   getCategories():void{
    let path:string = 'http://weeka.herokuapp.com/api/categories';
    this.q.getData(path).subscribe(
      res => {
        this.categories = res.data;
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
      console.log(this.mealData['mealPrice']);
      let price =  this.mealData['mealPrice'];
      let Percentage =20;
      this.afterPercentage = price - ( price*Percentage/100 )
      console.log(this.afterPercentage)



      let newMealpath: string = 'http://weeka.herokuapp.com/api/meals';
      let tokenUser = localStorage.getItem('token');
      console.log(tokenUser);
      this.q.postDataHeader(newMealpath,{
        headers : new HttpHeaders({'Authorization':`Bearer ${tokenUser}`})
      }).subscribe(
        res => {
          console.log(res)
        },
        err => { console.log(err)
        }
      );



    }
  }

}
