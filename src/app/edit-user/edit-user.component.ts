import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../query.service';
import { CartComponent } from '../cart/cart.component';

//Services
import { TransferDataService } from '../transfer-data.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild(CartComponent) cart:CartComponent;  

  historyMeals: Array<any>;
  allCartMeals:Set<any>;
  favouriteMeals: Array<any>;  

  constructor(private q: QueryService, private transfer:TransferDataService) { 
    this.historyMeals = [];
    this.getHistoryData();
    this.favouriteMeals = [];
    this.getFavData();
  }

  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allCartMeals = product);   
  }

  // ============== get data from server ===============
  getHistoryData(): void {
    let path = '../../assets/history.json';
    this.q.getData(path).subscribe(
      res => {
        this.historyMeals = res;
      },
      err => { console.log(err) }
    );
  }

    // ============== get data from server ===============
    getFavData(): void {
      let path = '../../assets/favourite.json';
      this.q.getData(path).subscribe(
        res => {
          this.favouriteMeals = res;
        },
        err => { console.log(err) }
      );
    }

  // ============== trigger order button ==============
  addToCartHistory(id){
    this.historyMeals.forEach(element => {
      
      if(element.id == id){
        this.allCartMeals.add(element);
      }
    })
    this.cart.totalOneMeal = 0;
    this.cart.addPrice();
  }

}
