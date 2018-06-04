import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cooker-data',
  templateUrl: './cooker-data.component.html',
  styleUrls: ['./cooker-data.component.scss']
})
export class CookerDataComponent implements OnInit {
  // ============ time picker ===============
  time = { hour: 13, minute: 30 };
  meridian = true;

  toggleMeridian() {
    this.meridian = !this.meridian;
  }
  constructor() { }

  ngOnInit() {
  }

}
