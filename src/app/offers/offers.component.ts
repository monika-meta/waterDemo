import { Component, OnInit, OnDestroy } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from '../models/offer';
import {CARD_STATIC_DATA} from '../app.config';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnDestroy {
  pageType: string;
  pageOffersData: Offer[];
  allOfferData: Offer[];
  isSelectOffer: boolean;
  cardStaticData: object = CARD_STATIC_DATA;
  getOffersDataObservable: Subscription;
  getSelectedOffersObservable: Subscription;
  updateOfferObservable: Subscription;
  constructor(private route: ActivatedRoute, public offersService: OffersService) { }

  ngOnInit(): void {
    this.pageType = this.route.snapshot.data.type;
    this.isSelectOffer = this.offersService.isSelectOffer;
    this.getOffersData();
  }

  trackByFn(index, item) {
    return item.id; // unique id corresponding to the item
  }

  getOffersData() {
    this.getOffersDataObservable = this.offersService.getOffersData()
      .subscribe((data: Offer[]) => {
        this.allOfferData = data;
        this.pageOffersData = this.pageType === 'one' ? data.
          filter(categoryOne => categoryOne.category === 1) : data
            .filter(categoryTwo => categoryTwo.category === 2);
      },
        (err) => {
          console.log('error', err);
        });
  }

  deselectSelectedOffer() {
    this.getSelectedOffersObservable = this.offersService.getSelectedOffers()
      .subscribe((selectedOffers: Offer[]) => {
        if (selectedOffers.length) {
          selectedOffers[0].selected = false;
          this.updateOffer(selectedOffers[0]);
        }
      },
        (err) => {
          console.log('error', err);
        });
  }

  updateOffer(offerData: Offer) {
    this.updateOfferObservable = this.offersService.updateOffer(offerData).subscribe((data) => {
      this.getOffersData();
    },
      (err) => {
        console.log('error', err);
      });
  }

  deselectOffer(offer: Offer) {
    this.isSelectOffer = false;
    this.offersService.isSelectOffer = false;
    offer.selected = false;
    this.updateOffer(offer);
  }

  selectOffer(offer: Offer) {
    this.isSelectOffer = true;
    this.offersService.isSelectOffer = true;
    offer.selected = true;
    this.updateOffer(offer);
  }

  ngOnDestroy(): void {
    if (this.getOffersDataObservable) {
      this.getOffersDataObservable.unsubscribe();
    }
    if (this.getSelectedOffersObservable) {
      this.getSelectedOffersObservable.unsubscribe();
    }
    if (this.updateOfferObservable) {
      this.updateOfferObservable.unsubscribe();
    }
  }
}
