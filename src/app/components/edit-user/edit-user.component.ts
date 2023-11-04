import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { User } from "src/app/shared/models/user";
import { SnackbarService } from "src/app/shared/services/snackbar.service";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent{
  editUserForm: FormGroup;
  user: User;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public snack: SnackbarService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.editUserForm = this.fb.group({
      id: [this.user.id],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [{value: this.user.email, disabled: true}, Validators.required],
      street: [this.user.street, Validators.required],
      postalCode: [this.user.postalCode, Validators.required],
      housenumber: [this.user.housenumber, Validators.required],
      city: [this.user.city, Validators.required],
    });
  }

  home() {
    this.router.navigate([`/user-profile/${this.user.id}`]);
  }

  submit() {
    this.authService.updateUser(this.editUserForm.value);
    this.router.navigate([`/user-profile/${this.user.id}`]);
    this.snack.update("Updated the settings of "+this.user.firstName, "");
  }
}
