import { Component, Input } from '@angular/core';
import { PaymentDetailModel } from '../../shared/payment-detail.model';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { SharingService } from '../../shared/sharing-service';

@Component({
  selector: 'app-payment-detail-item',
  templateUrl: './payment-detail-item.component.html',
  styleUrl: './payment-detail-item.component.css'
})
export class PaymentDetailItemComponent {
  @Input() detailList!: PaymentDetailModel;

  constructor(private http: PaymentDetailService, private share: SharingService){}

  EditDetail(){
    console.log("Edit button clicked.");
    this.share.updateDetail(this.detailList as PaymentDetailModel);
  }

  DeleteDetail(){
    this.http.deleteDetail(this.detailList.paymentDetailId).subscribe({
      next: (response) => {
        console.log(response);
    }, error: (error) => {
      console.log(error);
    }, complete: () => {
      console.log("Deletion Completed successfully.");
    }
  })
  }
}
