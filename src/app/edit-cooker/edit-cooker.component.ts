import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-edit-cooker',
  templateUrl: './edit-cooker.component.html',
  styleUrls: ['./edit-cooker.component.scss']
})
export class EditCookerComponent implements OnInit {
  @ViewChild('status') status: ElementRef;
  chefStat: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  statusFunc() {
    // console.log(this.status.nativeElement.value);
    // this.chefStat = this.status.nativeElement.value;
    console.log(this.status);
  }
}
