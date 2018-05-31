import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { QueryService } from '../query.service';
import { ArgumentOutOfRangeError } from 'rxjs/internal/util/ArgumentOutOfRangeError';



@Component({
  selector: 'app-become-acooker',
  templateUrl: './become-acooker.component.html',
  styleUrls: ['./become-acooker.component.scss']
})
export class BecomeAcookerComponent implements OnInit {
  public cookerData: object;
  public areas: Array<object>;

  constructor(private q: QueryService) {
    this.cookerData = {};
    this.areas = [];
    this.getAreas();


  }

  //function to get areas from json file   

  getAreas(): void {
    let path: string = '../../assets/become-acooker-areas.json';
    this.q.getData(path).subscribe(
      res => {
        this.areas = res;
        console.log(this.areas);
      },
      err => {
        console.log(err);
      }
    )
  }

  register(data: NgForm): void {
    if (!data.valid) {
      console.log("error");

    }
    else {

      this.cookerData = data.value;
      console.log(this.cookerData);

    }
  }

  ngOnInit() {
  }

}
