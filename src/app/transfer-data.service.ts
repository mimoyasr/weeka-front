import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  private itemInput: number;
  constructor() {
    this.itemInput = 1;
   }

  // To Set Number Of The Meal 
  public setItemInput(val: number): void {
      this.itemInput = val;
  }
  // To Get Number Of The Meal  
  public getItemInput(): number {
      return this.itemInput;
  }

}
