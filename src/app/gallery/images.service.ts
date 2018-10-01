import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from "firebase/app";
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../shared/services/alert.service';
import { of } from 'rxjs';
import { Image } from '../shared/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private db: AngularFireDatabase, 
            private authService: AuthService,
            private alert: AlertService) { }

  getImages(sortValue: string){      
    return new Observable<Image[]>(observer => {
      this.db.list('/images').valueChanges()
        .subscribe(
          (images: any) => {
            observer.next(images.sort((a, b) => {
              if (sortValue === 'likes') {              
                return b.likesAmount - a.likesAmount
              }
              if (sortValue === 'latest') {              
                return new Date(b.date).getTime() - new Date(a.date).getTime()
              } else {              
                return images
              }
            }))
          }
        )
    })
  }

  getImage(id: string) {
    return this.db.object('/images/' + id).valueChanges();
  }

  updateLikes(id: string) {
    if (this.authService.isAuthenticated()) {
      const imgRef = firebase.database().ref('images/' + id);    
      this.toggleLike(imgRef, this.authService.getCurUser().uid);
    } else {
      this.alert.openSnackBar("Please log in first!")
    }
  }

  updateImage(id: string, newValues: {tags: string[], descr: string}) {
    if (this.authService.isAuthenticated()) {
      const imgRef = this.db.object('/images/' + id);      
      imgRef.update({ 
        descr:  newValues.descr,
        tags: newValues.tags
      })
      .then( res => this.alert.openSnackBar('The photo has been updated successfully!'))
      .catch( err => this.alert.openSnackBar(err.message))
    }
  }

  deleteImage(id: string) {
    if (this.authService.isAuthenticated()) {
      const imgDbRef = this.db.object('/images/' + id);   
      const imgStorageRef = firebase.storage().ref().child('/images/' + id);
      imgDbRef.remove()
      .then( res => {
        imgStorageRef.delete().catch(error => console.log(error.message))
        this.alert.openSnackBar('The photo has been deleted!');
      })
      .catch( err => this.alert.openSnackBar(err.message))
    }
  }

  getImageLikeState(id: string): Observable<any> {  
    return new Observable<boolean> (observer => {
      if (this.authService.isAuthenticated()) {
        const curUserId: string = this.authService.getCurUser().uid;  
        const image = this.getImage(id);
        image.subscribe(
          (res: Image) => {
            if (res.likes && res.likes[curUserId]) {              
              observer.next(true)
            } else {              
              observer.next(false)
            }
          } 
        )
      } else {              
        observer.next(false)
      }
    })
  }

  private toggleLike(imageRef, uid) {    
    imageRef.transaction((image) => {
      if (image) {
        if (image.likes && image.likes[uid]) {
          image.likesAmount--;
          image.likes[uid] = null;
        } else {
          image.likesAmount++;
          if (!image.likes) {
            image.likes = {};
          }
          image.likes[uid] = true;
        }
      }      
      return image;
    });
  }
}
