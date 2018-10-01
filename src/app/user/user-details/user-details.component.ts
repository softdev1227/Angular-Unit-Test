import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';

import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../../shared/services/messages.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user: User = {email: ''};
  token: string;
  hidePassword: boolean = true;
  defaultPlaceholder: string = 'Not chosen yet';
  editMode: string;
  curUser: any;
  fileToUpload: File = null;
  subs: Subscription;

  constructor( private authService: AuthService, 
              private msgService: MessagesService,
              private userService: UserService,
              private afAuth: AngularFireAuth,
              private alert: AlertService) { }

  ngOnInit() {
    this.curUser = this.afAuth.auth.currentUser;
    this.user.nickname = this.curUser.displayName;
    this.user.email = this.curUser.email;
    this.user.photoUrl = this.curUser.photoURL || this.userService.getDefAvatar();

    this.subs = this.userService.userAvatarChanged
      .subscribe(
        (newImgPath: string) => {
          this.user.photoUrl = newImgPath;
        }
      )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getErrorMessage(formControl) {
    return this.msgService.getFormFieldErrorMsg(formControl);    
  }

  editUsersData(field: string) {
    this.editMode = field;
  }

  saveName(formControl) {
    this.editMode = null;
    this.curUser.updateProfile({
      displayName: formControl.value
    })
    .then(() => {
      this.alert.openSnackBar('Updated successfully!')
      this.user.nickname = this.afAuth.auth.currentUser.displayName;
    })
    .catch((error) => {
      this.alert.openSnackBar(error.message)
    });
  }

  saveEmail(formControl) {
    this.editMode = null;
    this.curUser.updateEmail(formControl.value)
    .then(() => {
      this.alert.openSnackBar('Updated successfully!')
      this.user.email = this.afAuth.auth.currentUser.email;
    }).catch((error) => {
      this.alert.openSnackBar(error.message)
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0); 
}

  saveAvatar() {    
    this.editMode = null;
    this.userService.uploadUserAvatar(this.fileToUpload)
      .then(() => {  
        this.alert.openSnackBar('Updated successfully!')
      }).catch((error) => {
        this.alert.openSnackBar(error.message)
      });
  }

}
