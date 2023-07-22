import { Component } from '@angular/core';
import { Listing } from '../type';
import { ListingsService } from '../listings.service';

// RxJS & HTTPClient

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.scss']
})
export class ListingsPageComponent {
  listings: Listing[] = [];

  constructor(
    private listingsService: ListingsService,
  ) {}

  ngOnInit(): void {
    this.listingsService.getListings()
      .subscribe(listings => this.listings = listings);
  }
}
