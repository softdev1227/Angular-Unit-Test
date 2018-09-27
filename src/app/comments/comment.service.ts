import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../shared/models/comment.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase/app";
import { AlertService } from '../shared/services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private db: AngularFireDatabase, 
              private afAuth: AngularFireAuth,
              private alert: AlertService) { }

  save(id: string, mes: string) {
    const author = {
      id: this.afAuth.auth.currentUser.uid,
      name: this.afAuth.auth.currentUser.displayName,
      imgPath: this.afAuth.auth.currentUser.photoURL
    }
    const newComment = new Comment(author, mes, Date.now())

    const imgRef = firebase.database().ref('images/' + id);    
    imgRef.transaction((image) => {
      if (image) {
        if (!image.comments) {
          image.comments = [];
        } 
        image.comments.push(newComment)
      }      
      return image;
    })
    .then(res => {
      this.alert.openSnackBar('Your comment successfully saved')
    })
    .catch(error => {
      this.alert.openSnackBar(error.message)
    })
  }

  getComments(id: string) {
    return this.db.list('images/' + id + '/comments').valueChanges();
  }
}
