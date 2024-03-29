import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CartComponent } from '../cart/cart.component';
import { MealCommentComponent } from '../meal-comment/meal-comment.component'

// ============= service ==============
import { QueryService } from '../query.service';
import { TransferDataService } from '../transfer-data.service';
import { element } from 'protractor';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  @ViewChild(CartComponent) child: CartComponent;
  @ViewChild( MealCommentComponent) comment:  MealCommentComponent;


  singleName: string;
  singleData: object;
  mealData: Array<any>;
  allCartMeals: Set<any>;
  constructor(private active: ActivatedRoute,
    private query: QueryService,
    private transfer: TransferDataService) {

    this.singleData = {};
    this.mealData = [];
    // this.allCartMeals = new Set();

    // ========= accessing name comes from url ===========    
    this.active.params.subscribe(
      params => {
        this.singleName = (params.name);
        console.log(this.singleName);
        this.getMealData();
        

      }
    );
   

  }
  //============ get data from server file ==========
  getMealData(): void {
    let path: string = `http://weeka.herokuapp.com/api/menu/${this.singleName}`;
    this.query.getData(path).subscribe(
      res => {
        this.singleData = res.data;
        console.log(this.singleData);
        this.singleData['qty'] = 1;
        console.log(res.data['district_slug']);
        console.log(res.data['slug']);
        this.query.set_Meal_dist(res.data['district_slug'],res.data['slug']);
/*         this.query.setState(res.data['comment_state']);
 */        this.comment.getComments();
      },
      err => { console.log(err) }
    );
  }

  //============ Add To Cart ==========
  addToCart(): void {

    this.allCartMeals.forEach(element => {
      if (element["meal_id"] == this.singleData['meal_id']) {
        element['qty'] = parseInt(element['qty']) + 1;
      }
    });
    this.allCartMeals.add(this.singleData);

    this.child.totalOneMeal = 0;
    this.child.addPrice();
  }
  ngOnInit() {
    //listen to data from the service
    this.transfer.cast.subscribe(product => this.allCartMeals = product);
  }


}
