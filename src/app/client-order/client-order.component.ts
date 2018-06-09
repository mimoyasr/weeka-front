import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { NgForm, NgModel } from '@angular/forms';

//service
import { TransferDataService } from '../transfer-data.service';
import { QueryService } from '../query.service';
@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  @ViewChild('optionSelect') optionSelect:ElementRef;
  
  allMealCart:Set<any>;
  totalOneMeal:number;
  totalAllMeals:number; 
  addressData:Array<object>;
  addressDetail:String; 
  addAddressMode:boolean;
  newAddress:Object;
  constructor(
    private transfer:TransferDataService,
    private data: QueryService
  ) {
    this.transfer.cast.subscribe(product => this.allMealCart = product );  
    this.totalAllMeals = 0;   
    this.addressDetail = ' ';
    this.addAddressMode = false;
    this.newAddress = {
      "title":"",
      "district":"",
      "street":"",
      "buildingNo":"",
      "floorNo":"",
      "flatNo":"",
      "notice":""
    }
    this.calcTotalOneMeal(); 
    this.getData();
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
        this.totalAllMeals = 0;
        this.calcTotalOneMeal();        
       }
    })
  }

  //get addresses data from json
  getData(): void {
    let path: string = "./assets/client-addresses.json";
    this.data.getData(path).subscribe(
      res => {
        this.addressData = res;
        this.addressFunc();            
      },
      err => { console.log(err) }
    );
  }

  // git address which is match with title
  addressFunc(){
    this.addressData.forEach(option => {
      if(this.optionSelect.nativeElement.value == option['title']){
        this.addressDetail = option['district'] + ', ' + option['street'] + ', ' + option['buildingNo'] + ', ' + option['floorNo'] + ', ' + option['flatNo'] + ', ' + option['notice'];
      }
    })
    
  }

  //add new address
  addAddress():void{
    this.addAddressMode = true;
  }

  // add address form submit
  addFunc(data:NgForm){
    if(data.valid){
      console.log(this.newAddress)
    }
  }


}
