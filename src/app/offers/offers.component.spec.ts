import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersComponent } from './offers.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OffersService } from '../services/offers.service';
import { Offer } from '../models/offer';

describe('OffersComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;
  let mockOffer: Offer;
  let testService: OffersService;
  let responsePropertyNames;
  let expectedPropertyNames;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule

      ],
      declarations: [OffersComponent],
      providers: [OffersService],
    }).compileComponents();
    mockOffer = {
      id: 1,
      type: 'STARTER',
      price: 1,
      detail: 'Starter features for your business to grow.',
      selected: false,
      category: 1
    };
    testService = TestBed.get(OffersService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getOffersData', () => {
    expect(component.getOffersData).toBeTruthy();
  });

  it('should have deselectSelectedOffer', () => {
    expect(component.deselectSelectedOffer).toBeTruthy();
  });

  it('should have updateOffer', () => {
    expect(component.updateOffer).toBeTruthy();
  });

  it('should have deselectOffer', () => {
    expect(component.deselectOffer).toBeTruthy();
  });

  it('should have selectOffer', () => {
    expect(component.selectOffer).toBeTruthy();
  });

  it('#getOffers should return an array with Offer objects', async () => {
    testService.getOffersData().subscribe(value => {
      // Checking the property names of the returned object and the mockOffer object
      responsePropertyNames = Object.getOwnPropertyNames(value[0]);
      expectedPropertyNames = Object.getOwnPropertyNames(mockOffer);
      expect(responsePropertyNames).toEqual(expectedPropertyNames);
    });
  });

  it('#deselectSelectedOffer should get selected offers and then it should call update', async () => {
    // Updating the selected of offer with id 1
    testService.getSelectedOffers().subscribe(value => {
      spyOn(component, 'updateOffer');
      expect(component.updateOffer).toHaveBeenCalled();
    });

  });

  it('#updateOffer should update the offer', async () => {
    // Updating the selected of offer with id 1
    mockOffer.id = 1;
    mockOffer.selected = true;
    testService.updateOffer(mockOffer).subscribe(value => {
      expect(value).toEqual(mockOffer);
    });
  });

  it('#deselectOffer should should change selected false and should call updateOffer method', async () => {
    spyOn(component, 'updateOffer');
    component.deselectOffer(mockOffer);
    expect(mockOffer.selected).toEqual(false);
    expect(component.isSelectOffer).toEqual(false);
    expect(testService.isSelectOffer).toEqual(false);
    expect(component.updateOffer).toHaveBeenCalled();
  });

  it('#selectOffer should change selected true and should call updateOffer method', async () => {
    spyOn(component, 'updateOffer');
    component.selectOffer(mockOffer);
    expect(mockOffer.selected).toEqual(true);
    expect(component.isSelectOffer).toEqual(true);
    expect(testService.isSelectOffer).toEqual(true);
    expect(component.updateOffer).toHaveBeenCalled();
  });
});
