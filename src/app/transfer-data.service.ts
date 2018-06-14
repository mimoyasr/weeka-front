import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private totalNum: number;
  private myFunc: Function;
  private data = new BehaviorSubject(new Set);
  private data2 = new BehaviorSubject([]);
  private data3 = new BehaviorSubject({});
  private data4 = new BehaviorSubject({});
  private login = new BehaviorSubject({});
  


  //let me see data from any where
  cast = this.data.asObservable();
  cast2 = this.data2.asObservable();
  cast3 = this.data3.asObservable();
  cast4 = this.data4.asObservable();
  loginData = this.login.asObservable();
  


  constructor() { }

  // let me change on the data
  editData(newData) {
    this.data.next(newData);
  }

  public setFunc(val: Function): void {
    this.myFunc = val;
  }

  public getFunc(): Function {
    return this.myFunc;
  }


}
