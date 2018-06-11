import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//=========== services ================
import { QueryService } from '../query.service';
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit{

  mealData: Array<object>;
  districts: Array<object>;
  constructor(private Q: QueryService,
    private toSingleView: Router , 
    private transfer : TransferDataService) {

    this.mealData = [];
    this.districts = [];
    this.getMealData()
  }

  //function to get meal data from json file   
  getMealData(): void {
    let path: string = 'http://weeka.herokuapp.com/api/home';
    this.Q.getData(path).subscribe(
      res => {
        this.mealData = res.meals;
        this.districts = res.districts;
        console.log(this.mealData)
        console.log(this.districts)
        this.transfer.cast2.subscribe(product => this.districts = product);    

      },
      err => { console.log(err) }
    );
  }

  ngOnInit(){
    
  }
  
}
