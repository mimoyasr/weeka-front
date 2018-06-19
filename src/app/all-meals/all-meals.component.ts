import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryService } from '../query.service'
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss']
})
export class AllMealsComponent implements OnInit {
  @ViewChild('toggle') toggle: ElementRef;

  allMeals: Array<any>;
  modal: boolean;
  isActive: boolean;
  loggedInID: number;
  chefData: object;
  chefMeals: Array<any>;


  constructor(private query: QueryService) {
    this.allMeals = [];
    this.modal = false;
    this.chefData = {};
    this.chefMeals = [];
    this.getMeals();
  }

  ngOnInit() {
  }

  getMeals() {
    this.chefData = this.query.getChefData();
    this.chefMeals = this.chefData['meals'];
    console.log(this.chefMeals);
  }
  // ============== get loggedin chef data ==============
  // loggedIn() {
  // for authorization
  //   let path = "http://weeka.herokuapp.com/api/profile";
  //   let tokenUser = localStorage.getItem('token');
  //   return this.query.getData2(path, {
  //     headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
  //   }).subscribe(res => {
  //     this.loggedInID = res.data.id;
  //     console.log(this.loggedInID);
  //     this.getAllData();
  //   })
  // }

  // // ============== get data from server ===============
  // getAllData(): void {
  //   let path: string = `http://weeka.herokuapp.com/api/chefs/${this.loggedInID}`;
  //   this.query.getData(path).subscribe(
  //     res => {
  //       this.chefData = res.data;
  //       this.chefMeals = this.chefData['menu'];
  //       console.log(this.chefData['menu']);
  //     },
  //     err => { console.log(err) }
  //   );
  // }

  toggleFunc() {
    //============ meal is active to send to server ==========
    this.isActive = this.toggle.nativeElement.checked;
    // console.log(this.isActive);
    console.log(this.toggle.nativeElement.checked);
  }

}

