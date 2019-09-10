import { TestBed } from '@angular/core/testing';

import { OffersService } from './offers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OffersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: OffersService = TestBed.get(OffersService);
    expect(service).toBeTruthy();
  });
});
