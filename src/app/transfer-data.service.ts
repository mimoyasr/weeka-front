import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private totalNum: number;

  private data = new BehaviorSubject(new Set);
  private data2 = new BehaviorSubject([]);
  private data3 = new BehaviorSubject({});


  //let me see data from any where
  cast = this.data.asObservable();
  cast2 = this.data2.asObservable();
  cast3 = this.data3.asObservable();


  constructor() { }

  // let me change on the data
  editData(newData) {
    this.data.next(newData);
  }

  public setFunc(val: number): void {
    this.totalNum = val;
  }

  public getFunc(): number {
    return this.totalNum;
  }


}
