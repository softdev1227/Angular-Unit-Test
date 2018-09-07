import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../shared/models/user.model';
import { Observable, Subject } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;
  userSignedInStatus = new Subject<boolean>();

  constructor(public afAuth: AngularFireAuth,
            private alert: AlertService,
            private router: Router) {}

  getCurUser() {
    return this.afAuth.auth.currentUser;
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then( response => {
        this.alert.openSnackBar('You are logged in successfully!');
        firebase.auth().currentUser.getIdToken()
          .then( (token: string) => {
            this.token = token;
            this.userSignedInStatus.next(true);
          })
      })
      .catch(error => {
        this.alert.openSnackBar(error.message)
      })
  }

  signup(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(resolve => {
        this.alert.openSnackBar("Your account has been created. Please log in");
      })
      .catch( err => {
        this.alert.openSnackBar(err.message);
      })
  }

  logout() {    
    return this.afAuth.auth.signOut()
      .then( res => {
        this.userSignedInStatus.next(false);
        this.token = null;
        this.alert.openSnackBar('You are logged out!')
      });
  }

  getToken() {
    this.afAuth.auth.currentUser.getIdToken()
          .then( (token: string) => {
            this.token = token;
          })
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }


}
