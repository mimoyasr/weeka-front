import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../query.service';
import { HttpHeaders } from '@angular/common/http';
import { CartComponent } from '../cart/cart.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Router } from '@angular/router';

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
  favMealsID: Array<any>;
  mealID: number;
  favMeals: Array<any>;
  favFlag: boolean;
  homeImg: Array<any>;

  constructor(private query: QueryService,
    private transfer: TransferDataService,
    private cooker: Router) {

    this.userData = {};
    this.loggedIn();
    this.loggedInID = localStorage.getItem('userID');
    this.historyMeals = [];
    this.favMealsID = [];
    this.favMeals = [];
    this.favFlag = false;
    this.homeImg = [];

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
      this.historyMeals = this.userData['inqueries'];
      this.favMealsID = this.userData['favs'];
      this.getFavMeals();
      this.data.getUserData();
      this.favFlag = true;
      this.getHomeImg();
    })
  }

  // ================ fav meals ============
  getFavMeals() {
    for (let meal of this.favMealsID) {
      this.mealID = meal.meal_id;
      let path = `http://weeka.herokuapp.com/api/meals/${this.mealID}`;
      this.query.getData(path).subscribe(
        res => {
          this.favMeals.push(res.data);

        },
        err => {
          console.log(err);
        }
      );
    }
    console.log(this.favMeals);
  }

  // ============== trigger order button ==============
  addToCartHistory(id) {
    this.favMeals.forEach(element => {

      if (element.meal_id == id) {
        this.allCartMeals.add(element);
      }
    })
    this.cart.totalOneMeal = 0;
    this.cart.addPrice();
  }

  //redirect to cooker profile
  redirectToCooker(d: string) {
    console.log(d);
    this.cooker.navigate([`/cookerprofile/${d}`]);

  }

  getHomeImg(): void {
    let path: string = "./assets/images-home.json";
    this.query.getData(path).subscribe(
      res => {
        this.homeImg = res;
      },
      err => { console.log(err) }
    );
  }

}
