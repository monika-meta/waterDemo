import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  SERVER_URL: string = environment.SERVER_URL;
  isSelectOffer = false;
  constructor(private httpClient: HttpClient) { }

  public getOffersData() {
    return this.httpClient.get<Offer[]>(this.SERVER_URL + 'offers');
  }
  public updateOffer(offer, id: number) {
    return this.httpClient.put(`${this.SERVER_URL + 'offers'}/${id}`, offer);
  }

}
