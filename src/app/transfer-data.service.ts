import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private totalNum:number;

  private data = new BehaviorSubject(new Set);

  //let me see data from any where
  cast = this.data.asObservable();

  constructor() { }

  // let me change on the data
  editData(newData){
    this.data.next(newData);
  }

  public setFunc(val: number): void {
    this.totalNum = val;
  }

  public getFunc(): number {
    return this.totalNum;
  }


}
