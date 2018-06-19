import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../query.service';
import { ActivatedRoute } from '@angular/router';
import { ArgumentOutOfRangeError } from 'rxjs/internal/util/ArgumentOutOfRangeError';
import { CartComponent } from '../cart/cart.component';
import { HttpHeaders } from '@angular/common/http';
import { TransferDataService } from '../transfer-data.service';
import { concat } from 'rxjs/internal/observable/concat';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cooker-profile',
  templateUrl: './cooker-profile.component.html',
  styleUrls: ['./cooker-profile.component.scss']
})
export class CookerProfileComponent implements OnInit {

  @ViewChild(CartComponent) child: CartComponent;

  public cookerData: Array<object>;
  public meals: Array<object>;
  public workinghours: Array<object>;
  public rate = 3;
  logedUser: Object;
  token: String;
  public cookerId: string;
  public allCartMeals: Set<any>;
  homeImg: Array<object>;


  constructor(private q: QueryService,
    private active: ActivatedRoute,
    private transfer: TransferDataService,
    private cooker: Router) {

    this.cookerData = [];
    this.meals = [];
    this.token = localStorage.getItem('token');
    this.logedUser = {};
    this.getLoginedData();
    this.homeImg = [];


    // ========= accessing id comes from url ===========    
    this.active.params.subscribe(
      params => {
        this.cookerId = (params.id);
        this.getData();

      }
    );
  }

  //function to get data from database 

  getData(): void {
    let path: string = `http://weeka.herokuapp.com/api/chefs/${this.cookerId}`;
    this.q.getData(path).subscribe(
      res => {

        this.cookerData = res.data;

        this.meals = res.data['menu'];
        this.workinghours = res.data['working_hours'];

        console.log(this.cookerData);
        console.log(this.workinghours);

        console.log(this.meals);
        this.meals.forEach(elem => {
          elem['qty'] = 1;
        })

        this.cookerData = res.data;

        this.meals = res.data['menu'];
        this.workinghours = res.data['working_hours'];

        console.log(this.cookerData);
        console.log(this.workinghours);

        console.log(this.meals);
        this.meals.forEach(elem => {
          elem['qty'] = 1;
        })

        this.getHomeImg();

      },
      err => {
        console.log(err);
      }
    )
  }
  // add to cart function
  addToCart(mealId) {
    this.meals.forEach(element => {
      if (element["meal_id"] == mealId) {
        this.allCartMeals.add(element);
      }
    });

    console.log(this.allCartMeals)
    this.child.totalOneMeal = 0;
    this.child.addPrice();

  }
  // get logined user data
  getLoginedData() {
    if (this.token) {
      let path2 = "http://weeka.herokuapp.com/api/profile";
      return this.q.getData2(path2, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
      }).subscribe(res2 => {
        console.log(res2);
        this.logedUser = res2;
        this.transfer.setData(this.logedUser);
      })
    }
  }
  // function to log out
  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allCartMeals = product);
  }
  getHomeImg(): void {
    let path: string = "./assets/images-home.json";
    this.q.getData(path).subscribe(
      res => {
        this.homeImg = res;
      },
      err => { console.log(err) }
    );
  }

  //redirect to cooker profile
  redirectToCooker(d: string) {
    console.log(d);
    this.cooker.navigate([`/cookerprofile/${d}`]);

  }
}
