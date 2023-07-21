import { Component } from '@angular/core';
import { fakeListings } from '../fake-data';
import { Listing } from '../type';

@Component({
  selector: 'app-my-listings-page',
  templateUrl: './my-listings-page.component.html',
  styleUrls: ['./my-listings-page.component.scss']
})
export class MyListingsPageComponent {
  listings: Listing[] = [];

  constructor() { }

  ngOnInit(): void {
    this.listings = fakeListings;
  }

  onDeleteClicked(listingId: string | null): void {
    alert(`Deleting your listing with id ${listingId}`)
  }
}
