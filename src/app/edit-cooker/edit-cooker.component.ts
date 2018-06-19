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

  chefStat: object;
  chefData: object;
  loggedInID: string;

  constructor(private query: QueryService) {

    this.chefData = {};
    this.loggedIn();
    this.loggedInID = localStorage.getItem('userID');
    this.chefStat = {};
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
    })
  }

  //========== send put request to change chef state ===========
  statusFunc() {
    this.chefStat['state'] = this.status.nativeElement.value;
    console.log(this.chefStat['state']);
    if (this.chefStat['state']) {
      this.chefData['state'] = "true";
    }
    else {
      this.chefData['state'] = "false";
    }
    // patch request to update cooker data object in database
    let path: string = `http://weeka.herokuapp.com/api/chefs/${this.loggedInID}`;
    let tokenUser = localStorage.getItem('token');
    console.log(tokenUser);
    return this.query.putData(path, this.chefStat, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
    }).subscribe(
      res => {
        console.log(res);
      },
      err => { console.log(err) }
    );
  }
}
