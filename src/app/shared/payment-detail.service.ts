import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PaymentDetailModel } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  url: string = environment.ApiBaseUrl + '/PaymentDetail';

  constructor(private http: HttpClient) { }

  getList(): Observable<PaymentDetailModel[]>{
    return this.http.get<PaymentDetailModel[]>(this.url);
  }

  addDetail(item: PaymentDetailModel): Observable<PaymentDetailModel>{
    return this.http.post<PaymentDetailModel>(this.url, item);
  }

  deleteDetail(itemId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${itemId}`);
  }

  updateDetail(itemId: number, item: PaymentDetailModel): Observable<PaymentDetailModel>{
    item.paymentDetailId = itemId;
    return this.http.put<PaymentDetailModel>(`${this.url}/${itemId}`, item as PaymentDetailModel);
  }
}
