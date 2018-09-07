import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  getFormFieldErrorMsg(control) {
    return control.errors.required ? 'This field is required' : 
      control.errors.email ? 'Please enter a valid email' :
      control.errors.maxlength ? 'Max length is 10 characters' :
      control.errors.pattern ? 'This field must contain digits, lowercase and uppercase letters and be min 6 char long' : ''
  }

  getServerErrorMsg(err) {
    return err.code === 'auth/wrong-password' ? 'The password is wrong' : err.message;
  }

}
