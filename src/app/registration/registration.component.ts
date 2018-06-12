import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { QueryService } from '../query.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  RegisterData: object;
  alreadyUser: boolean;

  constructor(private q: QueryService,
    private router: Router) {
    this.RegisterData = {
      "gender": "male"
    };
    this.alreadyUser = false;
  }

  ngOnInit() {
  }

  //=========== form validation function =============
  registerFunc(data: NgForm): void {
    if (data.valid) {
      // ====== post request to save regiteration data object in db ===========
      let path = 'http://weeka.herokuapp.com/api/clients';
      this.q.postData(path, this.RegisterData).subscribe(res => this.redirect(),
        err => { this.alreadyUser = true });
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
