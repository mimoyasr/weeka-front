import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../query.service';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';
import { validateConfig } from '@angular/router/src/config';
import { concat } from 'rxjs/internal/observable/concat';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public area:string;
  public meals:Array<object>;
  public slugName:string;

  constructor(private q: QueryService,private active: ActivatedRoute,private cooker: Router) {
    this.meals=[];
   
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
    },
    err => {
      console.log(err);
    }
  )
}

// add To Cart function
addToCart(){
  
}
//redirect to cooker profile
redirectToCooker(d:string){
  console.log(d);
  this.cooker.navigate([`/cookerprofile/${d}`]);

}
  ngOnInit() {
  }

}
