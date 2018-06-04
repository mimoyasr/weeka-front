import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  // private myfunc:Set<any>;

  private data = new BehaviorSubject(new Set);

  //let me see data from any where
  cast = this.data.asObservable();

  constructor() { }

  // let me change on the data
  editData(newData){
    this.data.next(newData);
  }

  // public setFunc(val: Set<any>): void {
  //   this.myfunc = val;
  // }

  // public getFunc(): Set<any> {
  //   return this.myfunc;
  // }


}
