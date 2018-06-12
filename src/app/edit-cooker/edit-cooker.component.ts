import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-edit-cooker',
  templateUrl: './edit-cooker.component.html',
  styleUrls: ['./edit-cooker.component.scss']
})
export class EditCookerComponent implements OnInit {

  @ViewChild('status') status: ElementRef;
  chefStat: boolean;
  chefData: object;

  constructor(private query: QueryService) {

    this.chefData = {};
    this.getChefData();
  }

  ngOnInit() {

  }

  getChefData(): void {
    let path = 'http://weeka.herokuapp.com/api/chefs/1';
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
