import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetailModel } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  paymentDetailList: PaymentDetailModel[] = [];

  constructor(private http: PaymentDetailService){}

  ngOnInit(){
    this.http.getList().subscribe({
      next: (data: PaymentDetailModel[]) => {
        this.paymentDetailList = data
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('Request Complete')
      }
    })
  }
}
