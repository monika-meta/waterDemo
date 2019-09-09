import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  SERVER_URL: string = "http://localhost:4200/api/";
  isSelectOffer: boolean = false;
  constructor(private httpClient: HttpClient) { }

  public getOffersData() {
    return this.httpClient.get(this.SERVER_URL + 'offers');
  }
  public getSelectedOffers() {
    return this.httpClient.get(`${this.SERVER_URL + 'offers'}?selected=^true`);
  }
  public deletePolicy(policyId) {
    return this.httpClient.delete(`${this.SERVER_URL + 'offers'}/${policyId}`)
  }
  public updateOffer(post) {
    return this.httpClient.put(`${this.SERVER_URL + 'offers'}/${post.id}`, post)
  }

}
