import { Component, OnInit } from '@angular/core';
//service
import { TransferDataService } from '../transfer-data.service';
import { element } from 'protractor';
import { HttpHeaders } from '@angular/common/http';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  allMealCart: Set<any>;
  cookerName: String;
  confirmedMeals: Array<object>;
  totalOneMeal: number;
  totalAllMeals: number;
  homeImg:Array<object>;  
  
  constructor(private transfer: TransferDataService, private Q: QueryService) {

    this.transfer.cast.subscribe(product => this.allMealCart = product);
    this.cookerName = '';
    this.confirmedMeals = [];
    this.totalAllMeals = 0;
    this.getMealData();
    this.calcTotalOneMeal();
    this.homeImg = [];        

  }

  ngOnInit() {
  }

  getMealData(): void {
    let path: string = 'http://weeka.herokuapp.com/api/home';
    let tokenUser = localStorage.getItem('token');
    this.Q.getData2(path, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
    }).subscribe(
      res => {
        this.cookerName = res.meals[0].chef_name;
        this.chefMeals();
        this.getHomeImg();

      },
      err => { console.log(err) }
    );
  }

  // check chef meals
  chefMeals(): void {
    this.allMealCart.forEach(element => {
      if (element["chef_name"] == this.cookerName) {
        this.confirmedMeals.push(element);
      }
    })
    console.log(this.confirmedMeals);
  }

  // calc total price for every meal
  calcTotalOneMeal(): void {
    this.confirmedMeals.forEach(element => {
      this.totalOneMeal = (parseInt(element['qty']) * parseInt(element['price']));
      element["totalOneMeal"] = this.totalOneMeal;
      this.totalAllMeals = this.totalAllMeals + element["totalOneMeal"];
    })
  }

  //confirm order
  confirmOrder(id): void {
    this.confirmedMeals.forEach(element => {
      if (element['meal_id'] == id) {
        let productIndex = this.confirmedMeals.indexOf(element);
        this.confirmedMeals.splice(productIndex, 1);

      }
    })
  }

  getHomeImg(): void {
    let path: string = "./assets/images-home.json";
    this.Q.getData(path).subscribe(
      res => {
        this.homeImg = res;
      },
      err => { console.log(err) }
    );
  }

}
