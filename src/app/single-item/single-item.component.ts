import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// ============= service ==============
import { QueryService } from '../query.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  singleName: string;
  singleData: object;
  mealData: Array<any>;

  constructor(private active: ActivatedRoute,
    private query: QueryService) {

    this.singleData = {};
    this.mealData = [];
    this.getMealData();

    // ========= accessing name comes from url ===========    
    this.active.params.subscribe(
      params => this.singleName = (params.name).replace(/%20/g, ' ')
    );

  }

  //============ get data from json file ==========
  getMealData(): void {
    let path: string = "../../assets/meal-card.json";
    this.query.getData(path).subscribe(
      res => {
        this.mealData = res;
        this.checkMeal();
      },
      err => { console.log(err) }
    );
  }

  // ========== accessing single product from all products ========
  checkMeal(): void {
    for (let meal of this.mealData) {
      if (meal.mealTitel == this.singleName) {
        this.singleData = meal;
      }
    }
  }
  ngOnInit() {
  }

}
