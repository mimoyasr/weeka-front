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
  @Input('cartProduct') allCartMeals:Set<object>;
  constructor( private transfer:TransferDataService ) { 
  }
  
  ngOnInit() {
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
    this.allCartMeals.forEach(element => {
      if(element["id"] == id){
        this.allCartMeals.clear();
      }
    });
    
  }

}
