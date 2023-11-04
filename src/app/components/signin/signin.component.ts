
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public snack: SnackbarService,
    private loadingController: LoadingController,
		private alertController: AlertController,
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  navigate(){
    this.router.navigate(['/sign-up'])
  }
  async googleLogin() {
    const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.google();
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl(`/user-profile/${user.user.uid}`, { replaceUrl: true });
			this.snack.add(`Welkom! ${user.user.email}`, ``);
		} else {
			this.snack.delete('Login failed, Please try again!', ``);
		}
    
  }

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		const user = await this.authService.login(this.signinForm.value);
		await loading.dismiss();

		if (user) {
			this.router.navigateByUrl(`/user-profile/${user.user.uid}`, { replaceUrl: true });
			this.snack.add(`Welkom! ${user.user.email}`, ``);
		} else {
			this.snack.delete('Login failed, Please try again!', ``);
		}
    
	}

//   async showAlert(header, message) {
// 		const alert = await this.alertController.create({
// 			header,
// 			message,
// 			buttons: ['OK']
// 		});
// 		await alert.present();
// 	}
}