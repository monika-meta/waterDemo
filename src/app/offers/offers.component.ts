import { Component, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../models/offer';
import { CARD_STATIC_DATA, CARD_COLORS } from '../app.const';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  pageType: string;
  offersData: Offer[];
  cardStaticData: any = CARD_STATIC_DATA;
  cardColors: object = CARD_COLORS;


  constructor(private route: ActivatedRoute, public offersService: OffersService) { }

  ngOnInit(): void {
    this.pageType = this.route.snapshot.data.type;
    this.getOffersData();
  }

  trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  getOffersData() {
    this.offersService.getOffersData()
      .subscribe((data: Offer[]) => {
        this.offersData = this.pageType === 'one' ? data.
          filter(categoryOne => categoryOne.category === 1) : data
            .filter(categoryTwo => categoryTwo.category === 2);
      },
        (err) => {
          console.log('error', err);
        });
  }

  updateOffer(offerData: Offer) {
    this.offersService.updateOffer(offerData).subscribe(() => {
      this.getOffersData();
    },
      (err) => {
        console.log('error', err);
      });
  }

  cancelOffer(offer: Offer) {
    this.offersService.isSelectOffer = false;
    offer.selected = false;
    this.updateOffer(offer);
  }

  selectOffer(offer: Offer) {
    this.offersService.isSelectOffer = true;
    offer.selected = true;
    this.updateOffer(offer);
  }

}
