import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../query.service';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';
import { validateConfig } from '@angular/router/src/config';
import { concat } from 'rxjs/internal/observable/concat';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { CartComponent } from '../cart/cart.component';
import { TransferDataService } from '../transfer-data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild(CartComponent) child: CartComponent;

  public area: string;
  public meals: Array<object>;
  public slugName: string;
  public allCartMeals: Set<any>;
  homeImg:Array<object>;

  constructor(private q: QueryService, private active: ActivatedRoute, private cooker: Router, private transfer: TransferDataService) {
    this.meals = [];
    this.homeImg = [];
    
    // this.allCartMeals = new Set();

    // ========= accessing name comes from url ===========    
    this.active.params.subscribe(
      params => {
        this.slugName = (params.name);
        console.log(this.slugName);
        this.getMeals();


      }
    );


  }

  //function to get meals from json file   

  getMeals(): void {
    let path: string = `http://weeka.herokuapp.com/api/districts/${this.slugName}/menu`;
    this.q.getData(path).subscribe(
      res => {
        console.log(res.data)
        this.meals = res.data;
        console.log(this.meals);
        this.meals.forEach(elem => {
          elem['qty'] = 1;
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  // add To Cart function
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
  //redirect to cooker profile
  redirectToCooker(d: string) {
    console.log(d);
    this.cooker.navigate([`/cookerprofile/${d}`]);

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



  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allCartMeals = product);
  }

}
