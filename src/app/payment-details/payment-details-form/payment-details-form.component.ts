import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { PaymentDetailModel } from '../../shared/payment-detail.model';
import { SharingService } from '../../shared/sharing-service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrl: './payment-details-form.component.css'
})
export class PaymentDetailsFormComponent {
  detailsTobeEdited: PaymentDetailModel | null = null;
  isEdit: boolean = false;
  paymentForm = new FormGroup({
    cardOwnerName: new FormControl(),
    cardNumber: new FormControl(),
    expirationDate: new FormControl(),
    securityCode: new FormControl()
  })

  constructor(private http: PaymentDetailService, private share: SharingService){
    this.share.detailToEdit$.subscribe(res => {
      this.detailsTobeEdited = res as PaymentDetailModel;
      this.paymentForm.patchValue({
        cardOwnerName: this.detailsTobeEdited?.cardOwnerName,
        cardNumber: this.detailsTobeEdited?.cardNumber,
        expirationDate: this.detailsTobeEdited?.expirationDate,
        securityCode: this.detailsTobeEdited?.securityCode
      });
      if(this.detailsTobeEdited?.cardNumber != null){
        this.isEdit = true;
      }
    }, err => {
      console.log(err);
    })
  }
  
  AddCard(){
    const cardDetails = this.paymentForm.value;
    if(this.isEdit == false){
      this.http.addDetail(cardDetails as PaymentDetailModel).subscribe({
        next: (response: PaymentDetailModel) => {
          console.log(response)
        }, error: (error) => {
          console.log(error)
        }, complete: () => {
          console.log('The items added to the list')
        }
      })
    } else{
      this.http.updateDetail(this.detailsTobeEdited?.paymentDetailId as number, cardDetails as PaymentDetailModel).subscribe({
        next: (response) => {
          console.log(response);
        }, error: (error) => {
          console.log(error)
        }, complete: () => {
          console.log("update record successful");
        }
      })
      this.paymentForm.reset();
      this.isEdit = false;
    }
  }
}
