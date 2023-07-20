import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { EditListingPageComponent } from './edit-listing-page/edit-listing-page.component';
import { compileClassMetadata } from '@angular/compiler';
import { MyListingsPageComponent } from './my-listings-page/my-listings-page.component';
import { NewListingsPageComponent } from './new-listings-page/new-listings-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/listings', pathMatch: 'full'},
  {path: 'listings', component: ListingsPageComponent, pathMatch: 'full'},
  {path: 'listings/:id', component: ListingsPageComponent},
  {path: 'contact/:id', component: ContactPageComponent}, 
  {path: 'edit-listing/:id', component: EditListingPageComponent},
  {path: 'my-listings', component: MyListingsPageComponent},
  {path: 'new-listing', component: NewListingsPageComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
