import {
  Injectable
} from '@angular/core';
import {
  AngularFireStorage
} from '@angular/fire/compat/storage';
import {
  Firestore
} from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  base64ToFile
} from 'ngx-image-cropper';

import {
  Observable
} from 'rxjs';
import {
  finalize
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private basePath = '';


  setPath(string: string) {
    this.basePath = string;
  }

  constructor(private storage: AngularFireStorage) {}

  push(photo: string, path: string): string {
    const filePath = `${this.basePath}/${path}`;
    console.log(photo)
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, base64ToFile(photo));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          return (downloadURL);
        });
      })
    ).subscribe();
    return null
  }


  deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
