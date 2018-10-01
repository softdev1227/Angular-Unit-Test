import { Injectable, OnInit } from '@angular/core';
// import * as firebase from 'firebase/app';

import { Image } from '../../shared/models/image.model';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertService } from '../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService implements OnInit {

  userImagesRef: AngularFireStorageReference;
  imagesRef: any;
  imageLikesDefault: number = 0;

  constructor(private storage: AngularFireStorage, 
            private db: AngularFireDatabase,
            private afAuth: AngularFireAuth,
            private alertService: AlertService) { }

  ngOnInit() {
  }

  private idGenerator() {
    const S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

  uploadImage(formValues, file: File) {
    const id = this.idGenerator();    
    this.userImagesRef = this.storage.ref('images').child(id);
    const curUser = this.afAuth.auth.currentUser;
    const creationDate = Date.now();    

    return this.userImagesRef.put(file)
      .then(snapshot => {
        this.userImagesRef.getDownloadURL()
          .subscribe(url => {            
            this.saveToDB(new Image(
              url, 
              {
                id: curUser.uid, 
                name: curUser.displayName, 
                imgPath: curUser.photoURL
              }, 
              creationDate,
              formValues.tags, 
              formValues.descr, 
              this.imageLikesDefault,
              {},
              id
            ));
          }
        )
      })
      .catch(error => {
        this.alertService.openSnackBar(error.message)
      });
  }

  saveToDB(image: Image) {            
    return this.db.database.ref('images/' + image.id).set({
      id: image.id,
      imgPath: image.imgPath,
      tags: image.tags,
      descr: image.descr,
      likesAmount: image.likesAmount,
      author: {
        id: image.author.id,
        name: image.author.name,
        imgPath: image.author.imgPath
      },
      createdOn: image.createdOn
    })
      .then(
        res => this.alertService.openSnackBar('Uploaded successfully!')
      )
  }
  
}
