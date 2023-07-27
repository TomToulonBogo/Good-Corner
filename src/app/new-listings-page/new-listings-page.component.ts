import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListingsService } from '../listings.service';
import { pipe, tap } from 'rxjs';


@Component({
  selector: 'app-new-listings-page',
  templateUrl: './new-listings-page.component.html',
  styleUrls: ['./new-listings-page.component.scss']
})
export class NewListingsPageComponent {
  constructor(
    private router: Router,
    private listingsService: ListingsService,

  ) { }

  ngOnInit(): void {

  }

  onSubmit({ name, description, price }: {[key: string]: any}/* A re-vérifier : https://medium.com/front-end-weekly/typescript-error-ts7031-makes-me-go-huh-c81cf76c829b */): void {
    this.listingsService.createListing(name, description, price)
    .pipe(
      tap(() => {
        this.router.navigateByUrl('/my-listings')
      })
    )
      .subscribe();
  }
}
