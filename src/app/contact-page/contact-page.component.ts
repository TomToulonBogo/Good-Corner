import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../type';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  email: string = '';
  message: string = '';
  public listing!: any; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id)
      .subscribe(listing => {
        this.listing = listing;
        this.message = `Hi, I'm interested in your ${this.listing.name.toLowerCase()}!`;
      });    
  }

  sendMessage(): void {
    alert('Your message has been sent !');
    this.router.navigateByUrl('/listings');
  }
}
