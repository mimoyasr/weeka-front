import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

//Services
import { TransferDataService } from '../transfer-data.service';
import { element } from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  allCartMeals:Set<object>;
  singlePrice: number;
  delivery:number;
  total:any;
  totalOneMeal:number;
  constructor( private transfer:TransferDataService ) { 
    this.delivery = 10;
    this.total = 0;
    this.allCartMeals = new Set();   
    this.totalOneMeal = 0;
  }
  
  ngOnInit() {
    //listen to data from the service
    this.transfer.cast.subscribe(product => this.allCartMeals = product)
    // this.totalOneMeal = this.allCartMeals.entries().next().value[0]["mealPrice"];
    this.addPrice();
  } 

  // Decrease And Increase Quantity
  minus(id):void{
    this.allCartMeals.forEach(element => {
      if(element["id"] == id){
        if(parseInt(element['qty']) < 2){
          element['qty'] = 1;
        }else{
          element['qty'] = parseInt(element['qty']) -1;
        }
        
      }
    });
    this.totalOneMeal = 0;
    this.addPrice();

  }

  plus(id):void{
    this.allCartMeals.forEach(element => {
      if(element["id"] == id){
        element['qty'] = parseInt(element['qty']) + 1;
      }
    });  
    this.totalOneMeal = 0;    
    this.addPrice();
    
  }

  //Delete Item From Cart
  removeItem(id):void{
    console.log(id)
    this.allCartMeals.forEach(element => {
      if(element["id"] == id){
        this.allCartMeals.delete(element);
      }
    });
    this.addPrice();
    
  }

  addPrice():void{
    this.allCartMeals.forEach(element => {
      this.singlePrice = (parseInt(element['mealPrice']) * parseInt(element['qty']));
      element['totalOneMeal'] = this.singlePrice;
      if(this.allCartMeals.size < 2){
        this.totalOneMeal = element['totalOneMeal'];
        
      }else{
        this.totalOneMeal = this.totalOneMeal + element['totalOneMeal'];
      }
    })
    this.total = this.delivery + this.totalOneMeal;
  }

  //cancel all order from cart
  cancelOrder():void{
    this.allCartMeals.clear();
  }

  //transfer the confirmed data to chef
  chefNotifications():void{
    this.transfer.cast.subscribe(product => this.allCartMeals = product )
  }

}
