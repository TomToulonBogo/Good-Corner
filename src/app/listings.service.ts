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

  // Méthode permettant d'afficher les annonces sur la page principal du site
  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  // Méthode permettant de sélectionner une annonce via son id
  getListingById(id: string|null): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  // Méthode permettant d'incrémenter le nombre de vues sur une annonce
  addViewToListing(id: string|null): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions,
    );
  }

  // Méthode permettant aux utilisateurs de récupérer leurs propres annonces
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

  // Méthode permettant aux utilisateurs de suppromer leurs annonces
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

  // Méthode permettant aux utilisateurs de créer de nouvelles annonces
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

  // Méthode permettant aux utilisateurs de modifiers leurs annonces
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
