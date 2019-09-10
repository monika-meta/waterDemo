import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersComponent } from './offers.component';
import { RouterModule} from '@angular/router'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OffersService } from '../services/offers.service';
import { Offer } from '../models/offer'
import { from } from 'rxjs';

describe('OffersComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;
  let mockOffer: Offer;
  let testService: OffersService;
  let responsePropertyNames, expectedPropertyNames;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule

      ],
      declarations: [ OffersComponent ],
      providers: [OffersService],

    })
    .compileComponents();
    mockOffer =  {
      id: 1,
      type: "STARTER",
      price: 1,
      detail: "Starter features for your business to grow.",
      selected: false,
      category: 1
  }
  testService= TestBed.get(OffersService);

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

  it('#getOffers should return an array with Offer objects',async() => {
    
    testService.getOffersData().subscribe(value => {
      //Checking the property names of the returned object and the mockPaste object
      responsePropertyNames = Object.getOwnPropertyNames(value[0]);
      expectedPropertyNames = Object.getOwnPropertyNames(mockOffer);
      
      expect(responsePropertyNames).toEqual(expectedPropertyNames);
       
    });
  });


  it('should have deselectSelectedOffer', () => {
    expect(component.deselectSelectedOffer).toBeTruthy();
  });

  it('#deselectSelectedOffer should get selected offers and then it should call update', async() => {
    //Updating the selected of offer with id 1
    testService.getSelectedOffers().subscribe(value => {
      spyOn(component, 'updateOffer');
      expect(component.updateOffer).toHaveBeenCalled();
    })
   
  })


  it('should have updateOffer', () => {
    expect(component.updateOffer).toBeTruthy();
  });

  it('#updateOffer should update', async() => {
    //Updating the selected of offer with id 1
    mockOffer.id = 1;
    mockOffer.selected = true
    testService.updateOffer(mockOffer).subscribe(value => {
      expect(value).toEqual(mockOffer);
    })
  })

  it('should have deselectOffer', () => {
    expect(component.deselectOffer).toBeTruthy();
  });

  it('#deselectOffer should call update', async() => {
    //Updating the selected of offer with id 1
    component.deselectOffer(mockOffer);
    expect(mockOffer.selected).toEqual(false);
    expect(component.isSelectOffer).toEqual(false);
    expect(testService.isSelectOffer).toEqual(false);

  })

  // it('On deselectOffer disable card should be remove on all cards',()=>{
  //   fixture.detectChanges();
  //   const el = fixture.nativeElement.querySelector('#card');
  //   console.log(fixture.nativeElement,'sdfsadfasdf')
  //   // expect(el.classList).not.toContain('disable')
  // })

});
