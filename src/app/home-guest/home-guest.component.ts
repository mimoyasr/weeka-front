import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService } from '../query.service';
import { HttpHeaders } from '@angular/common/http';
import { TransferDataService } from '../transfer-data.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.scss']
})
export class HomeGuestComponent implements OnInit {

  @ViewChild('userData') userData: EditUserComponent;

  workData: Array<object>;
  logedUser: Object;
  token: String;
  userType: string;
  userTypeCheck: boolean;
  constructor(private Q: QueryService,
    private transfer: TransferDataService,
    private router: Router
  ) {
    this.workData = [];
    this.token = localStorage.getItem('token');
    this.getWorkData();
    this.logedUser = {};
    this.getLoginedData();
    this.userTypeCheck = false;

  }
  getWorkData(): void {
    let path: string = "./assets/how-we-work.json";
    this.Q.getData(path).subscribe(
      res => {
        this.workData = res;
        console.log(this.workData)
      },
      err => { console.log(err) }
    );
  }


  // get logined user data
  getLoginedData() {
    if (this.token) {
      let path2 = "http://weeka.herokuapp.com/api/profile";
      return this.Q.getData2(path2, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
      }).subscribe(res2 => {
        console.log(res2);
        this.logedUser = res2;
        this.userType = res2.data['type'];
        console.log(this.userType)
        this.checkChef();
        this.transfer.setData(this.logedUser);
        // this.userData.getUserData();
      })
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  redirect(): void {
    if (this.userType == 'chef') {
      this.router.navigate(['/editCooker']);
    }
    else {
      this.router.navigate(['/editUser']);
    }
  }

  checkChef(): void {
    if (this.userType == 'chef') {
      this.userTypeCheck = true;
    }
    else {
      this.userTypeCheck = false;
    }
  }

  ngOnInit() {

  }

}




