import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service'

@Component({
  selector: 'app-user-favs',
  templateUrl: './user-favs.component.html',
  styleUrls: ['./user-favs.component.scss']
})
export class UserFavsComponent implements OnInit {
  favouriteMeals: Array<any>;

  constructor(private q: QueryService) {
    this.favouriteMeals = [];
    this.getFavData();
  }

  ngOnInit() {
  }
  // ============== get data from server ===============
  getFavData(): void {
    let path = '../../assets/favourite.json';
    this.q.getData(path).subscribe(
      res => {
        this.favouriteMeals = res;
      },
      err => { console.log(err) }
    );
  }
}
