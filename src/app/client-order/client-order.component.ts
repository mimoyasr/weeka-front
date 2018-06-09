import { Component, OnInit } from '@angular/core';

//service
import { TransferDataService } from '../transfer-data.service';
import { element } from 'protractor';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  allMealCart:Set<any>;
  totalOneMeal:number;
  totalAllMeals:number;  
  constructor(private transfer:TransferDataService) {
    this.transfer.cast.subscribe(product => this.allMealCart = product );  
    this.totalAllMeals = 0;   
    this.calcTotalOneMeal(); 
  }

  ngOnInit() {
  }


  // calc total price for every meal  
  calcTotalOneMeal():void{
    this.allMealCart.forEach(element => {
      this.totalOneMeal = (parseInt(element['qty']) * parseInt(element['mealPrice']));
      element["totalOneMeal"] = this.totalOneMeal;
      this.totalAllMeals = this.totalAllMeals + element["totalOneMeal"];
    })
  }

  //delete one item 
  confirmOrder(id):void{
    this.allMealCart.forEach(element => {
      if(element['id']==id){
        this.allMealCart.delete(element);        
       }
    })
  }

}
