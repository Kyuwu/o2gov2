import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { User } from "src/app/shared/models/user";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @Input() menu = false;
  @Input() state = "";

  currentUser: User
  constructor(private router: Router, private auth: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
   }
  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

  
  home() {
    this.router.navigate([`/user-profile/${this.currentUser.id}`])  
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
  adminServices() {
    this.router.navigate([`/dashboard/${this.currentUser.id}/services`])
  }
  adminScooters() {
    this.router.navigate([`/dashboard/${this.currentUser.id}/scooters`])
  }
}
