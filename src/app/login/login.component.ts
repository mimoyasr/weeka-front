import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

//service
import { QueryService } from '../query.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: any;
  checkUserFlage:boolean;
  constructor(private query: QueryService) {
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
    if (userData.valid) {
      // ====== post request to login users ===========
      let path = 'http://weeka.herokuapp.com/api/login';
      this.query.postData(path, this.userLogin).subscribe(res => console.log(res),
        err => { this.checkUserFlage = true
        });
    }
    else {
      console.log("data is not correct");
    }

  }


}
