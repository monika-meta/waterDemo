import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  pageType: String;
  pageOffersData: Object;
  allOfferData: any;
  isSelectOffer: boolean
  constructor(private route: ActivatedRoute, public offersService: OffersService) { }

  ngOnInit() {
    this.pageType = this.route.snapshot.data.type
    this.isSelectOffer = this.offersService.isSelectOffer;
    this.getOffersData();
  }

  getOffersData() {
    this.offersService.getOffersData().subscribe((data: Array<Object>) => {
      this.allOfferData = data;
      this.pageOffersData = this.pageType == 'one' ? data.filter(data => data['category'] == 1) : data.filter(data => data['category'] == 2);
    })
  }

  selectOffer(offer, isSelect) {
    if (isSelect) {
      this.isSelectOffer = true;
      this.offersService.isSelectOffer = true;
    } else {
      this.isSelectOffer = false;
      this.offersService.isSelectOffer = false
    }
    if (isSelect) {
      this.offersService.getSelectedOffers().subscribe((selectedOffers: any) => {
        if (selectedOffers.length) {
          const allObs = forkJoin(...selectedOffers.map(selectedOffer => {
            selectedOffer.selected = false;
            return this.offersService.updateOffer(selectedOffer)
          }));
          allObs.subscribe(res => {
            offer.selected = true
            this.offersService.updateOffer(offer).subscribe((data) => {
              this.getOffersData();
            })
          });
        } else {
          offer.selected = true
          this.offersService.updateOffer(offer).subscribe((data) => {
            this.getOffersData();
          })
        }
      })
    } else {
      this.offersService.getSelectedOffers().subscribe((selectedOffers: any) => {
        if (selectedOffers.length) {
          const allObs = forkJoin(...selectedOffers.map(selectedOffer => {

            selectedOffer.selected = false;
            return this.offersService.updateOffer(selectedOffer)
          }));
          allObs.subscribe(res => {
            this.getOffersData();
          });
        }
      });

    }
  }
}