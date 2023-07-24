import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'good-corner';

  constructor (
    public auth: AngularFireAuth,
  ) { }

  signInClicked() {
    this.auth.signInWithPopup(new GoogleAuthProvider());
  }

  signOutClicked(): void {
    this.auth.signOut();
  }
}
