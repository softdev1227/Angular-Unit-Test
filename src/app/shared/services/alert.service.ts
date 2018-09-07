import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
