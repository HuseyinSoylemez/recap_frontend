import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = "https://localhost:44329/api/";
  
  constructor(private httpClient: HttpClient) {}

  getCreditCards(): Observable<ListResponseModel<CreditCard>> {
    let newURL = this.apiUrl + "creditcards/getall";
    return this.httpClient.get<ListResponseModel<CreditCard>>(newURL);
  }
}
