import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../query.service';
import { CartComponent } from '../cart/cart.component';
import { HttpHeaders } from '@angular/common/http';

//Services
import { TransferDataService } from '../transfer-data.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild(CartComponent) cart: CartComponent;
  userData: object;
  allCartMeals: Set<any>;
  historyMeals: Array<any>;
  // favouriteMeals: Array<any>;

  constructor(private query: QueryService, private transfer: TransferDataService) {

    this.userData = {};
    this.historyMeals = [];

  }

  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allCartMeals = product);
  }

  getUserData() {
    this.userData = this.transfer.getData();
    console.log(this.userData);
  }



  // ============== trigger order button ==============
  addToCartHistory(id) {
    this.historyMeals.forEach(element => {

      if (element.id == id) {
        this.allCartMeals.add(element);
      }
    })
    this.cart.totalOneMeal = 0;
    this.cart.addPrice();
  }

}
