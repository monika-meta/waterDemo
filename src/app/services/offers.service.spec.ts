import { TestBed, getTestBed } from '@angular/core/testing';

import { OffersService } from './offers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Offer } from '../models/offer';
import { offerData } from '../offers-data';

describe('OffersService', () => {
  let injector: TestBed;
  let service: OffersService;
  let httpMock: HttpTestingController;
  const offerDataMock: Offer[] = offerData;
  const mockOffer: Offer = {
    id: 1,
    type: 'STARTER',
    price: 1,
    detail: 'Starter features for your business to grow.',
    selected: false,
    category: 1
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    injector = getTestBed();
    service = injector.get(OffersService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should return an Observable<User[]> and request should be GET', () => {
    service.getOffersData().subscribe((offers: Offer[]) => {
      expect(offers.length).toBe(4);
      expect(offers).toEqual(offerDataMock);
      const req = httpMock.expectOne(`${service.SERVER_URL}/offers`);
      expect(req.request.method).toBe('GET');
      req.flush(offerDataMock);

    });
  });

  it('request should be PUT', () => {
    service.updateOffer(mockOffer).subscribe(() => {
      const req = httpMock.expectOne(`${service.SERVER_URL}/offers/${mockOffer.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockOffer);
    });
  });

});

