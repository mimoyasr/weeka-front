import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { NgForm, NgModel } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userData: object;
  loggedInID: string;
  editFlag: boolean;
  closeResult: string;
  editedPass: object;

  constructor(private query: QueryService,
    private modalService: NgbModal) {

    this.userData = {};
    this.editFlag = false;
    this.editedPass = {};
    this.loggedInID = localStorage.getItem('userID');
  }

  ngOnInit() { }

  // ============= function to call from parent component ===========
  getUserData(): void {
    this.userData = this.query.getUserData();
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
      console.log(this.userData);
      this.editFlag = !this.editFlag;

      return this.query.patchData(path, this.userData, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${tokenUser}` })
      }).subscribe(
        res => {
          console.log(res);
          this.userData = res.data;
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
    //========== patch request to update password ===========
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

}
