import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { ActivatedRoute } from '@angular/router';
import { ArgumentOutOfRangeError } from 'rxjs/internal/util/ArgumentOutOfRangeError';
import {  HttpHeaders } from '@angular/common/http';
import { TransferDataService } from '../transfer-data.service';
import { concat } from 'rxjs/internal/observable/concat';


@Component({
  selector: 'app-cooker-profile',
  templateUrl: './cooker-profile.component.html',
  styleUrls: ['./cooker-profile.component.scss']
})
export class CookerProfileComponent implements OnInit {
  public cookerData:Array<object>;
  public meals:Array<object>;
  public workinghours:Array<object>;
  public rate=3;
  logedUser:Object;
  token:String;

  public cookerId:string;



  constructor(private q: QueryService,private active: ActivatedRoute,
    private transfer : TransferDataService) {
  
     this.cookerData=[];
     this.meals=[];
     this.token = localStorage.getItem('token');
     this.logedUser = {};
     this.getLoginedData();
     


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
      this.workinghours=res.data['working_hours'];

       console.log(this.token)
       console.log(this.logedUser);

       
    },
    err => {
      console.log(err);
    }
  )
}
// add to cart function
addToCart(){

}
 // get logined user data
 getLoginedData() {
  if(this.token){
    let path2 = "http://weeka.herokuapp.com/api/profile";
    return this.q.getData2(path2, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(res2 => {
      console.log(res2);
      this.logedUser = res2;
      this.transfer.setData(this.logedUser);
    })
  }
}
// function to log out
logout(){
  localStorage.removeItem('token');
  window.location.reload();
}
  ngOnInit() {
  }

}
