import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  sub1: Subscription
  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sub1 = this.auth.getUserById(id)
    .subscribe(userfetch => {
      // if the user doesn't exists, return to login page
      if (!userfetch) {
        this.router.navigate(['/log-in']);
      } else {
        this.currentUser = userfetch;
        if(this.currentUser.admin === false) {
          // if the user is not an admin, redirect to user-profile
          this.router.navigate([`user-profile/${this.currentUser.id}`]);
        }
        localStorage.setItem('user', JSON.stringify(userfetch));
      }
    });
  }

  scooters() {
    this.router.navigate([`/dashboard/${this.currentUser.id}/scooters`])
  }

  
  serviced() {
    this.router.navigate([`/dashboard/${this.currentUser.id}/services`])
  }
}
