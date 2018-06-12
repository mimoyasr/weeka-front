import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryService } from '../query.service'

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.scss']
})
export class AllMealsComponent implements OnInit {
  @ViewChild('toggle') toggle: ElementRef;
  allMeals: Array<any>;
  modal: boolean;
  isActive: boolean;

  constructor(private q: QueryService) {
    this.allMeals = [];
    this.modal = false;
    this.getAllData();
  }

  ngOnInit() {
  }

  // ============== get data from server ===============
  getAllData(): void {
    let path = '../../assets/all-meals.json';
    this.q.getData(path).subscribe(
      res => {
        this.allMeals = res;
      },
      err => { console.log(err) }
    );
  }

  toggleFunc() {
    //============ meal is active to send to server ==========
    this.isActive = this.toggle.nativeElement.checked;
    // console.log(this.isActive);
    console.log(this.toggle.nativeElement.checked);
  }

}

