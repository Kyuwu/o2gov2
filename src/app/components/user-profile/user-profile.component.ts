import {
  Component,
  OnInit
} from '@angular/core';
import {
  User} from 'src/app/shared/models/user';
import {
  AuthService
} from './../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  currentUser: User;
  sub1: Subscription
  constructor(
    public authService: AuthService,
    public router: Router,
    public auth: AuthService,
    public activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.auth.getUserById(id)
    .subscribe(userfetch => {
      // if the user doesn't exists, return to login page
      if (!userfetch) {
        this.router.navigate(['/log-in']);
      } else {
        this.currentUser = userfetch;
        if(this.currentUser.admin === true) {
          // if the user is an admin, redirect to admin dashboaard
          this.router.navigate([`dashboard/${this.currentUser.id}`]);
        }
        localStorage.setItem('user', JSON.stringify(userfetch));
      }
    });
  }

  contracts() {
    this.router.navigate([`/user-profile/${this.currentUser.id}/contracts`])
  }
  scooters() {
    this.router.navigate([`/user-profile/${this.currentUser.id}/scooters`])
  }
  services() {
    this.router.navigate([`/user-profile/${this.currentUser.id}/services`])
  }
  settings() {
    this.router.navigate([`/user-profile/${this.currentUser.id}/settings`])
  }
}
