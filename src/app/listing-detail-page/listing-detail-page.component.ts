import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../type';
import { pipe, tap } from 'rxjs';

@Component({
  selector: 'app-listing-detail-page',
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.scss']
})
export class ListingDetailPageComponent {
  isLoading: boolean = true;
  listing: Listing;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id)
    // La bonne méthode pour .subscribe !!!
      .pipe(
        tap((listing) => {
          this.listing = listing;
          this.isLoading = false})
      )
      .subscribe();
    // La bonne méthode pour .subscribe !!!

    this.listingsService.addViewToListing(id)
    .pipe(
      tap(() => console.log('Views updated'))
    )
      .subscribe ();
  }
}
