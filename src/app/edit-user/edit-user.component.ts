import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../query.service';
import { HttpHeaders } from '@angular/common/http';
import { CartComponent } from '../cart/cart.component';
import { UserInfoComponent } from '../user-info/user-info.component';

//Services
import { TransferDataService } from '../transfer-data.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild(CartComponent) cart: CartComponent;
  @ViewChild('data') data: UserInfoComponent;

  userData: object;
  loggedInID: string;
  allCartMeals: Set<any>;
  historyMeals: Array<any>;

  constructor(private query: QueryService, private transfer: TransferDataService) {

    this.userData = {};
    this.historyMeals = [];
    this.loggedIn();
    this.loggedInID = localStorage.getItem('userID');


  }

  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allCartMeals = product);
  }

  // ============== get logged in user data ==============
  loggedIn() {
    // for authorization
    let path = "http://weeka.herokuapp.com/api/profile";
    let tokenUser = localStorage.getItem('token');

    return this.query.getData2(path, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
    }).subscribe(res => {
      console.log(res.data);
      this.query.setUserData(res.data);
      this.userData = res.data;
      this.data.getUserData();
    })
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
