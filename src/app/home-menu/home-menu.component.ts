import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from '../query.service';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs/internal/observable/concat';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { TransferDataService } from '../transfer-data.service';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';



@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  public areas: Array<object>;
  public selected: string;
  public mySlug: string;
  districts: Array<object>;
  closeResult: string;



  constructor(private q: QueryService, private menu: Router, private a: ActivatedRoute,
    private transfer: TransferDataService, private modalService: NgbModal
  ) {
    this.areas = [];
    this.selected = this.q.getArea() || 'اختر منطقتك';
    this.districts = [];

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
  showItem(item: string, s: string) {
    this.selected = item;
    this.q.setArea(item);
    this.mySlug = s;
    console.log(this.mySlug);

  }
  // pop up to tell user enter  area
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  // redirect to menu
  redirectToMenu(d: any, s: string): void {

    if (this.selected == "اختر منطقتك") {
      console.log("error");
      this.open(d);
    }
    else {
      this.menu.navigate([`${this.mySlug}/menu/`]);
      console.log(s);
    }
  }

  ngOnInit() {
    this.transfer.cast2.subscribe(product => this.districts = product);
    console.log(this.districts)
  }

}
