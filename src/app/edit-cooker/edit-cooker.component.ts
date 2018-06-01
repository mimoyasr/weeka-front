import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-cooker',
  templateUrl: './edit-cooker.component.html',
  styleUrls: ['./edit-cooker.component.scss']
})
export class EditCookerComponent implements OnInit {
  editFlag: boolean;
  statFlag: boolean;
  visaFlag: boolean;
  notifyFlag: boolean;

  // ============ time picker ===============
  time = { hour: 13, minute: 30 };
  meridian = true;

  constructor() {
    this.editFlag = true;
    this.statFlag = false;
    this.visaFlag = false;
    this.notifyFlag = false;
  }

  editFunc(): void {
    this.editFlag = true;
    this.statFlag = false;
    this.visaFlag = false;
    this.notifyFlag = false;

  }
  statFunc(): void {
    this.editFlag = false;
    this.statFlag = true;
    this.visaFlag = false;
    this.notifyFlag = false;
  }
  visaFunc(): void {
    this.editFlag = false;
    this.statFlag = false;
    this.visaFlag = true;
    this.notifyFlag = false;
  }
  notifyFunc(): void {
    this.editFlag = false;
    this.statFlag = false;
    this.visaFlag = false;
    this.notifyFlag = true;
  }
  ngOnInit() {
  }

}
