import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { PhotoService } from '../../shared/services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public photoService: PhotoService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }


  async ngOnInit() {
    // await this.photoService.loadSaved();
  }
}
