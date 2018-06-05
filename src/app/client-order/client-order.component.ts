import { Component, OnInit } from '@angular/core';

//service
import { TransferDataService } from '../transfer-data.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  allMealCart:Set<any>;
  
  constructor(private transfer:TransferDataService) {

   }

  ngOnInit() {
    this.transfer.cast.subscribe(product => this.allMealCart = product ); 
    console.log(this.allMealCart)   
  }

}
