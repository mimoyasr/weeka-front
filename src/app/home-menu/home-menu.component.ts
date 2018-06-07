import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  public areas: Array<object>;

  constructor(private q: QueryService, private menu: Router) {
    this.areas = [];
   
   }
   // function to get areas

   getAreas(): void {
    let path: string = '../../assets/home-menu.json';
    this.q.getData(path).subscribe(
      res => {
        this.areas = res;
       
      },
      err => {
        console.log(err);
      }
    )
  }

   // redirect to menu
   redirectToMenu(): void {
    this.menu.navigate(['/menu/'])

  }

  ngOnInit() {
  }

}
