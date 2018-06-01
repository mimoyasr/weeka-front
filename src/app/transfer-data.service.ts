import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private data = new BehaviorSubject([]);

  //let me see data from any where
  cast = this.data.asObservable();

  constructor() { }

  // let me change on the data
  editData(newData){
    this.data.next(newData);
  }


}
