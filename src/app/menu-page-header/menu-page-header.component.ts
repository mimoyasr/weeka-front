import { Component, OnInit,Input ,ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-menu-page-header',
  templateUrl: './menu-page-header.component.html',
  styleUrls: ['./menu-page-header.component.scss']
})
export class MenuPageHeaderComponent implements OnInit {
  public area :string;
  token: String;
  logedUser: Object;
  userType: string;
  userTypeCheck: boolean;
  homeImg:Array<object>;  
 
  constructor( private Q: QueryService ) {
    this.token = localStorage.getItem('token');
    this.logedUser = {}; 
    this.userTypeCheck = false;
    this.homeImg = [];    
    this.getLoginedData();   
   }



   getLoginedData() {
    if (this.token) {
      let path2 = "http://weeka.herokuapp.com/api/profile";
      return this.Q.getData2(path2, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
      }).subscribe(res2 => {
   
        this.logedUser = res2;
        this.userType = res2.data['type'];
        console.log(this.userType)
        this.checkChef();
        this.getHomeImg();
      })
    }
  }

  checkChef(): void {
    if (this.userType == 'chef') {
      this.userTypeCheck = true;
    }
    else {
      this.userTypeCheck = false;
    }
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

  ngOnInit() {
  
  }

}
