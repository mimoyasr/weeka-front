import { Component, OnInit, Output } from '@angular/core';
import { QueryService } from '../query.service';
import { NgForm, NgModel } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cooker-data',
  templateUrl: './cooker-data.component.html',
  styleUrls: ['./cooker-data.component.scss']
})
export class CookerDataComponent implements OnInit {
  chefData: object;
  editFlag: boolean;
  closeResult: string;
  editedPass: object;
  loggedInID: string;
  chefGender: string;
  dayRow:Array<any>;

  constructor(private query: QueryService,
    private modalService: NgbModal) {

    this.editFlag = false;
    this.editedPass = {};
    this.loggedInID = localStorage.getItem('userID');
    this.dayRow = [1];
  }

  ngOnInit() {

  }

  getchef() {
    this.chefData = this.query.getChefData();
    console.log(this.chefData);
  }
  // ============ time picker ===============
  time = { hour: 13, minute: 30 };
  time2 = { hour: 18, minute: 30 };
  meridian = true;

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  editInfo(): void {
    this.editFlag = !this.editFlag;
  }

  //=========== form validation function =============
  editFunc(data: NgForm) {
    if (data.valid) {
      // patch request to update cooker data object in database
      let path: string = `http://weeka.herokuapp.com/api/chefs/${this.loggedInID}`;

      let tokenUser = localStorage.getItem('token');
      console.log(tokenUser);
      console.log(this.chefData);
      this.editFlag = !this.editFlag;

      return this.query.patchData(path, this.chefData, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
      }).subscribe(
        res => {
          console.log(res);
          this.chefData = res.data;
        },
        err => { console.log(err) }
      );

    }
    else {
      console.log("data is not correct");
    }
  }

  // ============= change password function ===============
  saveChanges(data: NgForm): void {

    //========== put request to update password ===========
    console.log(this.editedPass);
    let path: string = `http://weeka.herokuapp.com/api/chefs/${this.loggedInID}`;
    let tokenUser = localStorage.getItem('token');
    console.log(tokenUser);
    this.query.patchData(path, this.editedPass, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
    }).subscribe(
      res => {
        console.log(res);
        alert("Password changed successfully");
      },
      err => {
        console.log(err)
        alert("Password is invalid!");
      }
    );

  }

  // ================== modal function ===================
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

  addNewRow():void{
    this.dayRow.push(1);
  }

}
