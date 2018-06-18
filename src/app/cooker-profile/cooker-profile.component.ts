import { Component, OnInit, ViewChild} from '@angular/core';
import { QueryService } from '../query.service';
import { ActivatedRoute } from '@angular/router';
import { ArgumentOutOfRangeError } from 'rxjs/internal/util/ArgumentOutOfRangeError';
import { CartComponent } from '../cart/cart.component';
import { TransferDataService } from '../transfer-data.service';


@Component({
  selector: 'app-cooker-profile',
  templateUrl: './cooker-profile.component.html',
  styleUrls: ['./cooker-profile.component.scss']
})
export class CookerProfileComponent implements OnInit {

  @ViewChild(CartComponent) child: CartComponent;
  
  public cookerData:Array<object>;
  public meals:Array<object>;
  public cookerId:string;
  public allCartMeals: Set<any>;


  constructor(private q: QueryService,private active: ActivatedRoute, private transfer: TransferDataService) {
  
    this.cookerData=[];
    this.meals=[];
   
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
      this.meals=res.data['menu'];
       console.log(this.cookerData);
       console.log(this.meals);
       
    },
    err => {
      console.log(err);
    }
  )
}
// add to cart function
addToCart(mealId){
  this.meals.forEach(element => {
    if (element["id"] == mealId) {
      this.allCartMeals.add(element);
    }
  });

  console.log(this.allCartMeals)
  this.child.totalOneMeal = 0;
  this.child.addPrice();

}


  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allCartMeals = product);    
  }

}
