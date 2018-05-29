import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //=========== form validation function =============
  registerFunc(data: NgForm): void {
    if (data.valid) {
      alert("Information saved successfully");
    }
    else {
      alert("Oops! Please enter a valid data.");
    }
  }
}
