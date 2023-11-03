import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmedValidator } from 'src/app/shared/validators/confirmed.validator';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  user: User;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      housenumber: ['', Validators.required],
      city: ['', Validators.required],
      admin: [false]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  home() {
    this.router.navigate(['/']);
  }
  register() {
    this.authService.register(this.signupForm.value);
  }
}