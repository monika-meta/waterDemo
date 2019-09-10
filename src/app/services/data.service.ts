import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { offerData } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  offers = offerData;

  createDb() {
    const offers = this.offers;
    return { offers };

  }
}
