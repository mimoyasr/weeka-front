import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryService } from '../query.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-cooker',
  templateUrl: './edit-cooker.component.html',
  styleUrls: ['./edit-cooker.component.scss']
})
export class EditCookerComponent implements OnInit {

  @ViewChild('status') status: ElementRef;
  chefStat: boolean;
  chefData: object;
  loggedInID: number;

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
      console.log(res);
      this.loggedInID = res.data.id;
      console.log(this.loggedInID);
      this.getChefData();
    })
  }

  getChefData(): void {
    let path = `http://weeka.herokuapp.com/api/chefs/${this.loggedInID}`;
    this.query.getData(path).subscribe(
      res => {
        this.chefData = res.data;
        console.log(this.chefData);
      },
      err => { console.log(err) }
    );
  }

  statusFunc() {
    // console.log(this.status.nativeElement.value);
    this.chefStat = this.status.nativeElement.value;
    console.log(this.chefStat);
  }
}
