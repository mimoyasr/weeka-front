import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { element } from 'protractor';

//Services
import { TransferDataService } from '../transfer-data.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild ('cart') cart:ElementRef;

  //make cart position fixed
  
  // @HostListener('window:scroll') onScroll() {
  //    console.log(window.innerHeight)
  //     if (window.pageYOffset >= window.innerHeight) {

  //       this.cart.nativeElement.style.transition = 'all 0.5s ease-in-out';
  //       this.cart.nativeElement.style.top = 'window.innerHeight' + 'px';  
  //       // this.cart.nativeElement.style.position = 'relative';
  //       this.cart.nativeElement.style.bottom = '300' + 'px';
      
  //       console.log(this.cart.nativeElement.style.top);      
    
  //     }else{
  //       this.cart.nativeElement.style.bottom = 'auto';        
  //     }
  // }

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
    this.transfer.cast.subscribe(product => this.allCartMeals = product);    
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

  //make the cart position fixed
  


  // window.onscroll = function(){
  //   console.log(this.cart)
  
  //   if (window.pageYOffset >= 200) {
  
  //     this.cart.style.display = 'none';
  
  //   }else{
  
        
  
  //   }
  // };

}
