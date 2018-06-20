import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { QueryService } from '../query.service';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  userData: object;

  constructor(private query: QueryService) {
    this.userData = {};
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
      this.userData = res.data;

    })
  }

}
