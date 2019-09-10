import { Component, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Offer } from '../models/offer'
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  pageType: String;
  pageOffersData: Offer[];
  allOfferData: Offer[];
  isSelectOffer: boolean
  selectedOffterID: number
  constructor(private route: ActivatedRoute, public offersService: OffersService) { }

  ngOnInit() {
    this.pageType = this.route.snapshot.data.type
    this.isSelectOffer = this.offersService.isSelectOffer;
    this.getOffersData();
  }

  getOffersData() {
    this.offersService.getOffersData().subscribe((data: Offer[]) => {
      this.allOfferData = data;
      this.pageOffersData = this.pageType == 'one' ? data.filter(data => data['category'] == 1) : data.filter(data => data['category'] == 2);
    })
  }

  deselectSelectedOffer() {
    this.offersService.getSelectedOffers().subscribe((selectedOffers: Offer[]) => {
      if (selectedOffers.length) {
        selectedOffers[0].selected = false;
        this.updateOffer(selectedOffers[0]);
      }
    })
  }

  updateOffer(offerData : Offer) {
    this.offersService.updateOffer(offerData).subscribe((data) => {
      this.getOffersData();
    })
  }

  deselectOffer(offer : Offer) {
    this.isSelectOffer = false;
    this.offersService.isSelectOffer = false;
    offer.selected = false;
    this.updateOffer(offer)
  }

  selectOffer(offer : Offer) {
    this.isSelectOffer = true;
    this.offersService.isSelectOffer = true;
    // this.deselectSelectedOffer();
    offer.selected = true;
    this.updateOffer(offer);
  }

}