import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

//=========== services ================
import { QueryService } from '../query.service';
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {

  mealData: Array<object>;
  districts: Array<object>;
  loginData: Object;
  favBtn: Object;
  homeImg: Array<object>;

  constructor(private Q: QueryService,
    private toSingleView: Router,
    private transfer: TransferDataService) {
    this.mealData = [];
    this.districts = [];
    this.homeImg = [];
    this.favBtn = {};
    this.getMealData()

  }

  //function to get meal data from json file   
  getMealData(): void {
    let path: string = 'http://weeka.herokuapp.com/api/home';
    let tokenUser = localStorage.getItem('token');
    // let path: string = '../../assets/meal-card.json';
    this.Q.getData2(path, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
    }).subscribe(
      res => {
        this.mealData = res.meals;
        this.districts = res.districts;
        console.log(this.mealData)
        console.log(this.mealData['fav'])
        console.log(this.districts)
        this.loginData = this.transfer.getData();
        console.log(this.loginData)
        this.getHomeImg();
      },
      err => { console.log(err) }
    );
  }

  getHomeImg(): void {
    let path: string = "./assets/images-home.json";
    this.Q.getData(path).subscribe(
      res => {
        this.homeImg = res;
      },
      err => { console.log(err) }
    );
  }

  // post meal fav request
  fav(id) {

    let favpath: string = `http://weeka.herokuapp.com/api/meals/${id}/favs`;
    let tokenUser = localStorage.getItem('token');
    console.log(tokenUser);
    this.Q.postDataHeader(favpath, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
    }).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)

      }
    );


  }

  redirectToCooker(d: string) {
    console.log(d);
    this.toSingleView.navigate([`/cookerprofile/${d}`]);

  }

  ngOnInit() {

  }

}
