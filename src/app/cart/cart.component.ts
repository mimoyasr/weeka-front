import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { element } from 'protractor';
import { Router } from '@angular/router';

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
  constructor( private transfer:TransferDataService, private order:Router ) { 
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
        element['qty'] = 1;
        this.allCartMeals.delete(element);
      }
    });
    this.totalOneMeal = 0;
    this.addPrice();
    
  }

  addPrice():void{
    this.allCartMeals.forEach(element => {
      this.singlePrice = (parseInt(element['mealPrice']) * parseInt(element['qty']));
        this.totalOneMeal += this.singlePrice;
    })
    this.total = this.delivery + this.totalOneMeal;
  }

  //cancel all order from cart
  cancelOrder():void{
    this.allCartMeals.forEach(element => {
        element['qty'] = 1;
    });
    this.allCartMeals.clear();
  }

  //transfer the confirmed data to chef
  chefNotifications():void{
    this.transfer.cast.subscribe(product => this.allCartMeals = product );
    this.goClientOrder();
  }

  //redirct to client order
  goClientOrder():void{
    this.order.navigate(["/clientOrder/"]);
  }


}
