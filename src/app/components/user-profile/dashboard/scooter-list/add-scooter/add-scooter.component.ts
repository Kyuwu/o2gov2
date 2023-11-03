import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Scooter } from 'src/app/shared/models/scooter';
import { ScooterService } from 'src/app/shared/scooters.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-add-scooter',
  templateUrl: './add-scooter.component.html',
  styleUrls: ['./add-scooter.component.scss'],
})
export class AddScooterComponent implements OnInit {

  add: FormGroup;
  data: Scooter;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  ogImage: any = '';
  constructor(public fb: FormBuilder, public db: ScooterService, public snack: SnackbarService) {
    this.add = this.fb.group({
      photo: [""],
      licensePlate: ["", Validators.required],
      brand: ["", Validators.required],
      price: ["", Validators.required],
      description: ["", Validators.required],
      year: ["", Validators.required],
      maxKmh: ["", Validators.required],
    });
  }

  ngOnInit() {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.snack.update("image cropped", '')
    this.add.controls['photo'].setValue(this.croppedImage);
    console.log(this.croppedImage)
  }
  imageLoaded(image: LoadedImage) {
    this.snack.add("image loaded", '')
  }

  cropperReady() {
    this.snack.add("image ready", '')
  }
  addScooter(){
    this.db.createScooter(this.add.value)
  }
}
