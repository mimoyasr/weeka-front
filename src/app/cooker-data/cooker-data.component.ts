import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-cooker-data',
  templateUrl: './cooker-data.component.html',
  styleUrls: ['./cooker-data.component.scss']
})
export class CookerDataComponent implements OnInit {
  allData: Array<any>;
  cookerData: object;
  editFlag: boolean;
  // editedData: object;

  constructor(private query: QueryService) {

    this.allData = [];
    this.cookerData = {};
    this.getMealData();
    this.editFlag = false;
    // this.editedData = {};
  }

  // ============ time picker ===============
  time = { hour: 13, minute: 30 };
  meridian = true;

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  //============ get data from json file ==========
  getMealData(): void {
    let path: string = "../../assets/cooker-info.json";
    this.query.getData(path).subscribe(
      res => {
        this.allData = res;
        console.log(this.allData);
        this.checkMeal();
      },
      err => { console.log(err) }
    );
  }

  // ========== accessing single product from all products ========
  checkMeal(): void {
    for (let cooker of this.allData) {
      // if (cooker.mealTitel == this.cookerData) {
      this.cookerData = cooker;
      // }
    }
  }
  editInfo(): void {
    this.editFlag = !this.editFlag;
  }

  //=========== form validation function =============
  editFunc(data: NgForm): void {
    if (data.valid) {
      // post request to update cooker data object in database
      console.log(this.cookerData);
      this.editFlag = !this.editFlag;
    }
    else {
      console.log("data is not correct");
    }
  }
  ngOnInit() {
  }

}
