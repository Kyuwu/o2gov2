import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Scooter } from 'src/app/shared/models/scooter';
import { ScooterService } from 'src/app/shared/services/scooters.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-edit-scooter',
  templateUrl: './edit-scooter.component.html',
  styleUrls: ['./edit-scooter.component.scss'],
})
export class EditScooterComponent{
  add: FormGroup;
  data: Scooter;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  ogImage: any = '';
  constructor(public fb: FormBuilder, public db: ScooterService, public snack: SnackbarService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.add = this.fb.group({
      licensePlate: [data.licensePlate, Validators.required],
      brand: [data.brand, Validators.required],
      price: [data.price, Validators.required],
      description: [data.description, Validators.required],
      year: [data.year, Validators.required],
      maxKmh: [data.maxKmh, Validators.required],
      photo: [data.photo]
    });
    this.data = data;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.add.addControl('photo', new FormControl(this.croppedImage, Validators.required));
    this.add.controls['photo'].setValue(this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
    this.snack.add("image loaded", '')
  }

  cropperReady() {
    this.snack.add("image ready", '')
  }

  updateScooter() {
    this.db.updateScooter(this.add.value)
  }
}
