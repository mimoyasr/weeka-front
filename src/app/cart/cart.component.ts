import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';

//Services
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // @Input('cartProduct') allCartMeals:Set<object>;
  allCartMeals:Set<object>;
  singlePrice: number;
  mealPrice:any;
  delivery:number;
  total:any;
  arr:Array<any>;
  flag:boolean;
  constructor( private transfer:TransferDataService ) { 
    this.mealPrice = 0;
    this.delivery = 10;
    this.total = 0;
    this.arr = [];
    this.allCartMeals = new Set();   
this.flag = false
  }
  
  ngOnInit() {
    //listen to data from the service
    this.transfer.cast.subscribe(
      product => {this.allCartMeals = product;
        this.flag = true;
        console.log(this.flag)
        if(this.flag){
          this.addPrice();
          console.log("done")
        }
        // if(this.allCartMeals.size != 0){
        //   this.addPrice();

        // }

      })
         
    console.log(this.allCartMeals);
  } 
  ngDoCheck(){
    
  } 
  ngAfterViewChecked(){
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
  }

  plus(id):void{
    this.allCartMeals.forEach(element => {
      if(element["id"] == id){
        element['qty'] = parseInt(element['qty']) + 1;
        
      }
    });
  }

  //Delete Item From Cart
  removeItem(id):void{
    console.log(id)
    this.allCartMeals.forEach(element => {
      if(element["id"] == id){
        this.allCartMeals.delete(element);
      }
    });
    
  }

  //for add meal price into var 
  addPrice():void{
    if(this.allCartMeals.size != 0){
      this.allCartMeals.forEach(element => { 
        this.singlePrice = (parseInt(element['mealPrice']) * parseInt(element['qty']));
        this.mealPrice += this.singlePrice ;
        // this.mealPrice = (parseInt(element['mealPrice']));
        
      });
      
      // this.arr.push(this.mealPrice);
      // console.log(this.arr);
      this.total = this.delivery + this.mealPrice;      
    }
  }

  //cancel all order from cart
  cancelOrder():void{
    this.allCartMeals.clear();
  }

}
