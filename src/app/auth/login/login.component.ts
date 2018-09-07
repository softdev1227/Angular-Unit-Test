import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../../shared/services/messages.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') form: NgForm;
  hidePassword: boolean = true;

  constructor(private msgService: MessagesService,
            private authService: AuthService,
            private router: Router) { }

  ngOnInit() {
  }

  getErrorMessage(formControl) {
    return this.msgService.getFormFieldErrorMsg(this.form.controls[formControl])
  }

  onFormSubmit(form: NgForm) {
    this.authService.login(form.value)
      .then(resolve => {
        this.router.navigate(['/user'])
      })
  }
}
