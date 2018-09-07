import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { MessagesService } from '../../shared/services/messages.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupForm') form: NgForm;
  
  hidePassword: boolean = true;

  constructor(private msgService: MessagesService, 
            private authService: AuthService,
            private router: Router) { }

  ngOnInit() {
  }

  getErrorMessage(controlName) {
    return this.msgService.getFormFieldErrorMsg(this.form.controls[controlName]);
  }

  onFormSubmit(form: NgForm) {
    this.authService.signup(form.value)
      .then(resolve => {
        this.router.navigate(['/login']);
      })
  }

}
