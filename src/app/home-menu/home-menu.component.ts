import { Component, OnInit, Input  } from '@angular/core';
import { QueryService } from '../query.service';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import { TransferDataService } from '../transfer-data.service';


@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  public areas: Array<object>;
  public selected:string;
  districts: Array<object>;
 
  

  constructor(private q: QueryService, private menu: Router,private a:ActivatedRoute,
    private transfer : TransferDataService 
  ) {
    this.areas = [];
    this.selected=this.q.getArea()||'اختر منطقتك';
    this.districts =[];
   }
   // function to get areas

   getAreas(): void {
    let path: string = 'http://weeka.herokuapp.com/api/districts';
    this.q.getData(path).subscribe(
      res => {
        this.areas = res.data;
       console.log(this.areas)
      },
      err => {
        console.log(err);
      }
    )
  }
  // show selected item in button
   showItem(item:string){
    this.selected= item;
    this.q.setArea(item);
  
  } 

   // redirect to menu
   redirectToMenu(): void {

/*     get url /api/districts/{slug}/menu -> array of meals 
 */    this.menu.navigate(['/menu/'],)

  }

  ngOnInit() {
    this.transfer.cast2.subscribe(product => this.districts = product);
    console.log(this.districts)    
  }

}
