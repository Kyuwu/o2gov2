import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snaccy: MatSnackBar) { }
  delete(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
    });
  }
  edit(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
    });
  }
  add(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
    });
  }
  update(message: string, action: string) {
    this.snaccy.open(message, action, {
       duration: 2000,
       verticalPosition: 'top',
    });
  }
}
