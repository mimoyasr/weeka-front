import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { NgForm, NgModel } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

//service
import { TransferDataService } from '../transfer-data.service';
import { QueryService } from '../query.service';
@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  @ViewChild('optionSelect') optionSelect: ElementRef;
  @ViewChild('optionSelect2') optionSelect2: ElementRef;
  allMealCart: Set<any>;
  totalOneMeal: number;
  totalAllMeals: number;
  addressData: Array<object>;
  addressDetail: String;
  addAddressMode: boolean;
  newAddress: Object;
  flatNum: number;
  phoneNumbers: Array<object>;
  phoneDetail: String;
  addNewPhoneMode: boolean;
  newPhone: Object;
  closeResult: String;

  constructor(
    private transfer: TransferDataService,
    private data: QueryService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.transfer.cast.subscribe(product => this.allMealCart = product);
    this.totalAllMeals = 0;
    this.addressDetail = ' ';
    this.phoneDetail = ' ';
    this.addAddressMode = false;
    this.addNewPhoneMode = false;
    this.newAddress = {
      "title": "",
      "district": "",
      "street": "",
      "buildingNo": "",
      "floorNo": "",
      "flatNo": "",
      "notice": ""
    }
    this.newPhone = {
      "cityNum": "",
      "phoneNum": ""
    }
    this.calcTotalOneMeal();
    this.getData();
    this.getphones();
  }

  ngOnInit() {
  }

  // calc total price for every meal  
  calcTotalOneMeal(): void {
    this.allMealCart.forEach(element => {
      this.totalOneMeal = (parseInt(element['qty']) * parseInt(element['price']));
      element["totalOneMeal"] = this.totalOneMeal;
      this.totalAllMeals = this.totalAllMeals + element["totalOneMeal"];
    })
  }

  //delete one item 
  confirmOrder(id): void {
    this.allMealCart.forEach(element => {
      if (element['meal_id'] == id) {
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
  addressFunc(): void {
    this.addressData.forEach(option => {
      if (this.optionSelect.nativeElement.value == option['title']) {
        this.addressDetail = option['district'] + ', ' + option['street'] + ', ' + option['buildingNo'] + ', ' + option['floorNo'] + ', ' + option['flatNo'] + ', ' + option['notice'];
      }
    })

  }


  //add new address
  addAddress(): void {
    this.addAddressMode = true;
  }

  // add address form submit
  addFunc(data: NgForm) {
    if (data.valid) {
      this.addressData.push(this.newAddress);
      this.addAddressMode = false;
      this.newAddress = {};
    }
  }

  //get phones from json
  getphones(): void {
    let path: string = "./assets/client-phoneNum.json";
    this.data.getData(path).subscribe(
      res => {
        this.phoneNumbers = res;
        this.phoneFunc();
      },
      err => { console.log(err) }
    );
  }

  // git phones which is match selected option
  phoneFunc(): void {
    this.phoneNumbers.forEach(option => {
      if (this.optionSelect2.nativeElement.value == (option['cityNum'] + option['phoneNum'])) {
        this.phoneDetail = option['cityNum'] + option['phoneNum'];
      }
    })
  }

  // add new phone number
  addPhone(): void {
    this.addNewPhoneMode = true;
  }

  // submit new phone
  addFuncPhone(phone: NgForm): void {
    this.phoneNumbers.push(this.newPhone);
    this.addNewPhoneMode = false;
    this.newPhone = {
      "cityNum": "",
      "phoneNum": ""
    };
  }


  // confirm the order
  confirmOrderFinal(): void {
    this.transfer.cast.subscribe(product => this.allMealCart = product);
  }

  // trigger modal
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //redirct after confirm the order
  redirctMenu() {
    this.router.navigate(['/']);
  }

}
