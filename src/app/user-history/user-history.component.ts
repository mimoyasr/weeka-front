import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service'
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  historyMeals: Array<any>;

  constructor(private q: QueryService) {
    this.historyMeals = [];
    this.getHistoryData();
  }

  ngOnInit() {
  }

  // ============== get data from server ===============
  getHistoryData(): void {
    let path = '../../assets/history.json';
    this.q.getData(path).subscribe(
      res => {
        this.historyMeals = res;
      },
      err => { console.log(err) }
    );
  }
}
