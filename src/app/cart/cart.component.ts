import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

//Services
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild("inputNum") inputNum:ElementRef;
  // @Input('cartProduct') allCartMeals:Set<object>;
  allCartMeals:Set<object>;
  mealPrice:any;
  delivery:number;
  total:any;
  constructor( private transfer:TransferDataService ) { 
    this.mealPrice = 0;
    this.delivery = 10;
    this.total = 0;
  }
  
  ngOnInit() {
    //listen to data from the service
    this.transfer.cast.subscribe(product => this.allCartMeals = product)
    console.log(this.allCartMeals);
  } 
  ngDoCheck(){
    this.addPrice();
  } 
  
  // Decrease And Increase Quantity
  minus():void{
    if(parseInt(this.inputNum.nativeElement.value) < 2){
      this.inputNum.nativeElement.value = 1;
    }else{
      this.inputNum.nativeElement.value = parseInt(this.inputNum.nativeElement.value) - 1 ;
    }
  }

  plus():void{
    this.inputNum.nativeElement.value = parseInt(this.inputNum.nativeElement.value) + 1 ;    
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
        this.mealPrice =(parseInt(element['mealPrice']) * parseInt(element['qty']));
      });
      // this.mealPrice =parseInt(this.allCartMeals.entries().next().value[0]['mealPrice']) * parseInt(this.allCartMeals.entries().next().value[0]['qty']);
      this.total = this.delivery + this.mealPrice;      
      
    }
  }

}
