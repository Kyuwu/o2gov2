import {
  Injectable
} from '@angular/core';
import {
  throwError
} from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  SnackbarService
} from './snackbar.service';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, public router: Router, public snack: SnackbarService) {}

  getAdress(id: number) {
    // return this.http.get(`${this.endpoint}/users/address/${id}`);
  }

  update(user: User) {
    try {
      return this.snack.update("Updated", "")

    } catch (error) {
      return this.handleError(error);
    }  
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      this.snack.delete(msg, 'Ok');
    } else {
      // server-side error
      this.snack.delete(`${error.message}`, '');
      msg = `Error Code from server: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
