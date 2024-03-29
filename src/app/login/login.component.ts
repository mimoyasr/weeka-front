import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {  HttpHeaders } from '@angular/common/http';

//service
import { QueryService } from '../query.service';
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: any;
  checkUserFlage: boolean;
  constructor(private query: QueryService, private router: Router, private transfer:TransferDataService) {
    this.userLogin = {
      "email": "",
      "password": ""
    }
    this.checkUserFlage = false;

  }

  ngOnInit() {
  }

  // submit login form function
  loginData(userData: NgForm): void {
    console.log(userData)
    if (userData.valid) {
      // ====== post request to login users ===========
      let path = 'http://weeka.herokuapp.com/api/login';

      this.query.postData(path, this.userLogin).subscribe(res => {
        localStorage.setItem('token', res.token);
        console.log(res);
        // nested request
          // for authorization
          let path2 = "http://weeka.herokuapp.com/api/profile";
          let tokenUser = localStorage.getItem('token');
          return this.query.getData2(path2,{
            headers : new HttpHeaders({'Authorization':`Bearer ${tokenUser}`})
          }).subscribe(res2 => {
            console.log(res2.data['id']);
            let userID = localStorage.setItem('userID',res2.data['id']);
            this.transfer.loginData.subscribe(product => res2 = product);
            this.redirect();
          })
      },
        err => {
          this.checkUserFlage = true
        });

    }
    else {
      console.log("data is not correct");
    }

  }

  // ============== redirect function ================
  redirect(): void {
    this.router.navigate(['/']);
  }


}
