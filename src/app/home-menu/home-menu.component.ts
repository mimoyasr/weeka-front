import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Router } from '@angular/router';

import { NgModel, NgForm } from '@angular/forms';




@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  public areas: Array<object>;
  public selected:string;
  

  constructor(private q: QueryService, private menu: Router) {
    this.areas = [];
    this.selected="اختر منطقتك"
   
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
  // show selected item in button
   showItem(item:string){
    this.selected=item;
  } 

   // redirect to menu
   redirectToMenu(): void {
    this.menu.navigate(['/menu/'])

  }

  ngOnInit() {
  }

}
