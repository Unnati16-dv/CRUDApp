import { Injectable } from "@angular/core";
import { PaymentDetailModel } from "./payment-detail.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SharingService {
    private detailToEdit = new BehaviorSubject<PaymentDetailModel | null>(null);
    detailToEdit$ = this.detailToEdit.asObservable();

    updateDetail(item: PaymentDetailModel){
        this.detailToEdit.next(item);
    }
}