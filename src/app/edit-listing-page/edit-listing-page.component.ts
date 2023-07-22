import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { Listing } from '../type';
import { fakeListings } from '../fake-data';

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
      .subscribe(listing => this.listing = listing);
  }
  
  onSubmit({name, description, price}:{[key:string]:any} /* A re-vérifier : https://medium.com/front-end-weekly/typescript-error-ts7031-makes-me-go-huh-c81cf76c829b */): void {
    this.listingsService.editListing(this.listing.id, name, description, price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
