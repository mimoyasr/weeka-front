import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentData: Object;
  confirmMsgTrue: boolean;
  confirmMsg:boolean;
  constructor(private http: Http) {
    this.paymentData = {
      "name": "",
      "type": "Credit Card",
      "card_no": "",
      "exp": "",
      "cvc": "",
      "card_holder_name": ""
    }
    this.confirmMsgTrue = false;
    this.confirmMsg = false;

  }

  ngOnInit() {
  }

  // trigger stripe payment
  chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    this.paymentData['card_no'] = form.cardNumber.value;
    this.paymentData['exp'] = form.expMonth.value;
    this.paymentData['cvc'] = form.cvc.value;

    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
        
      } else {
        console.log(response.error.message);
        console.log(this.paymentData)
      }
    });
    
    this.confirmMsgTrue = true;

  }

  //to send the token to backend server
  chargeCard(token: string) {
    const headers = new Headers({ 'token': token, 'amount': 100 });
    this.http.post('http://localhost:8080/payment/charge', {}, { headers: headers })
      .subscribe(resp => {
        console.log(resp);
      })
  }

  // submit the form
  visaData(data: NgForm): void {
    if (data.valid) {
    } else {
      this.confirmMsgTrue = false;
    }
  }

  cash():void{
    this.confirmMsg = true;
  }

}
