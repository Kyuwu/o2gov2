import {
  HttpClientModule} from '@angular/common/http';
import {
  NgModule
} from '@angular/core';
import {
  IonicModule} from '@ionic/angular';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  SigninComponent
} from './components/signin/signin.component';
import {
  SignupComponent
} from './components/signup/signup.component';
import {
  UserProfileComponent
} from './components/user-profile/user-profile.component';
import {
  AngularMaterialModule
} from './shared/angular-mat.module';
import {
  ScooterService
} from './shared/scooters.service';
import {
  ScooterServiceLocal
} from './shared/local/scooter.service';
import {
  CommonModule
} from '@angular/common';
import {
  ScootersComponent
} from './components/user-profile/scooters/scooters.component';
import {
  ServicesComponent
} from './components/user-profile/services/services.component';
import {
  ContractsComponent
} from './components/user-profile/contracts/contracts.component';
import {
  EditUserComponent
} from './components/edit-user/edit-user.component';
import { UserService } from './shared/user.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuComponent } from './components/menu/menu.component';
import { DataService } from './components/services/data.service';
import { PhotoService } from './components/services/photo.service';
import { AuthService } from './shared/auth.service';
import { DashboardComponent } from './components/user-profile/dashboard/dashboard.component';
import { ScooterListComponent } from './components/user-profile/dashboard/scooter-list/scooter-list.component';
import { AddScooterComponent } from './components/user-profile/dashboard/scooter-list/add-scooter/add-scooter.component';
import { EditScooterComponent } from './components/user-profile/dashboard/scooter-list/edit-scooter/edit-scooter.component';
import { ConfirmationDialog } from './shared/components/confirm-dialog/confirm-dialog.component';
import { FileuploadService } from './shared/fileupload.service';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { PlannedServicesComponent } from './planned-services/planned-services.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    ScootersComponent, 
    MenuComponent,
    MenuHeaderComponent,
    ServicesComponent,
    ContractsComponent,
    EditUserComponent,
    DashboardComponent,
    ScooterListComponent,
    AddScooterComponent,
    EditScooterComponent,
    ConfirmationDialog,
    PlannedServicesComponent
  ],
  providers: [ScooterService, UserService, DataService, PhotoService, ScooterServiceLocal, FirestoreModule, AuthService, FileuploadService],
  bootstrap: [AppComponent],
  imports: [BrowserModule, CommonModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, AngularMaterialModule, BrowserAnimationsModule, ImageCropperModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule]

})
export class AppModule {}
