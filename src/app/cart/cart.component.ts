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
  @Input('cartProduct') allCartMeals:Array<object>;
  constructor( private transfer:TransferDataService ) { 

    this.transfer.setItemInput(5);

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

}
