import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import {  HttpHeaders } from '@angular/common/http';
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']
})
export class HomeGuestComponent implements OnInit {
  workData: Array<object>;
  logedUser:Object;
  token:String;
  constructor(private Q: QueryService,
  private transfer : TransferDataService
  ) {
    this.workData = [];
    this.token = localStorage.getItem('token');
    this.getWorkData();
    this.logedUser = {};
    this.getLoginedData();
  }

  getWorkData(): void {
    let path: string = "./assets/how-we-work.json";
    this.Q.getData(path).subscribe(
      res => {
        this.workData = res;
        console.log(this.workData)
      },
      err => { console.log(err) }
    );
  }

  // get logined user data
  getLoginedData() {
    if(this.token){
      let path2 = "http://weeka.herokuapp.com/api/profile";
      return this.Q.getData2(path2, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
      }).subscribe(res2 => {
        console.log(res2);
        this.logedUser = res2;
        this.transfer.cast4.subscribe(product => this.logedUser = product);

      })
    }
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnInit() {

  }

}
