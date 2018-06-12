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
  favBtn: object;
  constructor(private Q: QueryService,
    private toSingleView: Router , 
    private transfer : TransferDataService) {
    this.mealData = [];
    this.districts = [];
    this.favBtn ={};
    this.getMealData()
  }

  //function to get meal data from json file   
  getMealData(): void {
    let path: string = 'http://weeka.herokuapp.com/api/home';
    // let path: string = '../../assets/meal-card.json';
    this.Q.getData(path).subscribe(
      res => {
        this.mealData = res.meals;
        this.districts = res.districts;
        console.log(this.mealData)
        console.log(this.mealData['fav'])
        console.log(this.districts)
        this.transfer.cast2.subscribe(product => this.districts = product);    
      },
      err => { console.log(err) }
    );
  }

  // fav():void
  // {
  //   let favpath: string = 'http://weeka.herokuapp.com/api/meals/{{}}/favs';
  //   this.Q.postData(favpath,this.favBtn).subscribe(
  //     res => {
  //       console.log(res)
  //     },
  //     err => { console.log(err) }
  //   );
  // }
  ngOnInit(){
    
  }
  
}
