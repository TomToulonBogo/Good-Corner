import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Listing } from './type';
import { Token } from '@angular/compiler';
import { user } from '@angular/fire/auth';
import { pipe, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById(id: string|null): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string|null): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions,
    );
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>(observer => {
      this.auth.user.pipe(
        tap(user => {
          user && user.getIdToken().then(token => {
            if (user && token) {
              this.http.get<Listing[]>(`/api/users/${user.uid}/listings`, httpOptionsWithAuthToken(token))
              .pipe(
                tap(listings => {
                  observer.next(listings);
                })
              )
              .subscribe();
            } else {
              observer.next([]);
            }
          })
        })
      )
      .subscribe();
    });
  }

  deleteListing(id: string|null): Observable<any> {
    return new Observable<any>(observer => {
      this.auth.user.pipe(
        tap(user => {
          user && user.getIdToken().then(token => {
            this.http.delete<Listing>(`/api/listings/${id}`, httpOptionsWithAuthToken(token))
            .pipe(
              tap(() => 
              observer.next())
            )
            .subscribe();
          })
        })
      )
      .subscribe();
    })
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      this.auth.user.pipe(
        tap(user => {
          user && user.getIdToken().then(token => {
            this.http.post<Listing>(
              '/api/listings',
              { name, description, price },
              httpOptionsWithAuthToken(token),
            ).pipe(
              tap(() => 
              observer.next())
            )
            .subscribe();
          })
        })
      )
      .subscribe();
    })
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      this.auth.user.pipe(
        tap(user => {
          user && user.getIdToken().then(token => {
            return this.http.post<Listing>(
              `/api/listings/${id}`,
              {name, description, price},
              httpOptionsWithAuthToken(token),
            ).pipe(
              tap(() => 
              observer.next())
            )
            .subscribe();
          })
        })
      )
      .subscribe();
    })
    
  }
}
