import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'angularfire2';
import { Injectable } from '@angular/core';
import { Subject, Observable, of, Subscriber } from 'rxjs';
import { AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Image } from '../shared/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAvatarChanged = new Subject<string>();
  userDefAvatar: string = "./assets/images/def_avatar.svg";
  userAvatarRef: AngularFireStorageReference;
  downloadURL: Observable<string>;
  curUser: any;

  constructor( private storage: AngularFireStorage, 
          private afAuth: AngularFireAuth,
          private db: AngularFireDatabase) {
   }

  getUser() {    
    return this.afAuth.auth.currentUser;
  }

  getDefAvatar() {
    return this.userDefAvatar;
  }

  uploadUserAvatar(file) {
    this.userAvatarRef = this.storage.ref('user-avatars').child(file.name);

    return this.userAvatarRef.put(file)
      .then(snapshot => {
        this.userAvatarRef.getDownloadURL()
          .subscribe(url => {
            this.curUser = this.afAuth.auth.currentUser;    
            this.curUser.updateProfile({
              photoURL: url
            });
            this.userAvatarChanged.next(url);
          }
        )

      })
      .catch(error => {
        console.log(error);
      });
    }

  getUserImages(): Observable<any> {
    const curUser: string = this.afAuth.auth.currentUser.uid;
    return this.db.list('images',
      ref => ref.orderByChild('author/id').equalTo(curUser)).valueChanges();

  }

}
