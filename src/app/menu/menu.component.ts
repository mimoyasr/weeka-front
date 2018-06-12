import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../query.service';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public area:string;
  public meals:Array<object>;

  constructor(private q: QueryService) {
    this.getMeals();

   }
  
  
//function to get meals from json file   

getMeals(): void {
  let path: string = '../../assets/meal-card.json';
  this.q.getData(path).subscribe(
    res => {
      this.meals = res;
       console.log(this.meals);
    },
    err => {
      console.log(err);
    }
  )
}
  ngOnInit() {
  }

}
