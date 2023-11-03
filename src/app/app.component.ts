import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { LoadingService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  constructor(public authService: AuthService, private _loading: LoadingService) { }
  logout() {
    this.authService.logout()
  }
  ngOnInit() {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
