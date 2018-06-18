import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryService } from '../query.service';
import { HttpHeaders } from '@angular/common/http';
import { CookerDataComponent } from '../cooker-data/cooker-data.component';
import { AllMealsComponent } from '../all-meals/all-meals.component';

@Component({
  selector: 'app-edit-cooker',
  templateUrl: './edit-cooker.component.html',
  styleUrls: ['./edit-cooker.component.scss']
})
export class EditCookerComponent implements OnInit {

  @ViewChild('status') status: ElementRef;
  @ViewChild('data') data: CookerDataComponent;
  @ViewChild('allMeals') allMeals: AllMealsComponent;

  chefStat: boolean;
  chefData: object;

  constructor(private query: QueryService) {

    this.chefData = {};
    this.loggedIn();
  }

  ngOnInit() {

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
      this.query.setChefData(res.data);
      this.chefData = res.data;
      this.data.getchef();
      console.log(this.allMeals)
      this.allMeals.getMeals();
      
      // this.allMeals.getMeals();
    })
  }


  statusFunc() {
    // console.log(this.status.nativeElement.value);
    this.chefStat = this.status.nativeElement.value;
    console.log(this.chefStat);
  }
}
