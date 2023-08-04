import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../type';
import { pipe, tap } from 'rxjs';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.scss']
})
export class EditListingPageComponent {
  public listing!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id)
    .pipe(
      tap(listing => 
        this.listing = listing)
    )
    .subscribe();
  }
  
  onSubmit({name, description, price}:{[key:string]:any}): void {
    this.listingsService.editListing(this.listing.id, name, description, price)
    .pipe(
      tap(() => {
        this.router.navigateByUrl('/my-listings');
      })
    )
    .subscribe();
  }
}
