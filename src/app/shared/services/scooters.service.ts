import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { Firestore, doc, collection, setDoc, deleteDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Scooter } from '../models/scooter';
import { Observable, finalize, map } from 'rxjs';
import { base64ToFile } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root',
})
export class ScooterService {
    
	constructor(private firestore: Firestore, private snack: SnackbarService, private storage: AngularFireStorage) {}

  //creates scooter entry with google firebase storage pictures
  createScooter(scooter: Scooter) {
    const filePath = `scooter/${scooter.licensePlate}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, base64ToFile(scooter.photo));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          scooter.photo = downloadURL;
          const document = doc(collection(this.firestore, 'scooters'), scooter.licensePlate);
          this.snack.update(`added scooter ${scooter.licensePlate}`,"")
            return setDoc(document, scooter);

        });
      })
    ).subscribe();
  }

  //updates scooter entry with google firebase storage pictures
  updateScooter(scooter: Scooter) {
    const filePath = `scooter/${scooter.licensePlate}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, base64ToFile(scooter.photo));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          scooter.photo = downloadURL;
          const document = doc(this.firestore, 'scooters', scooter.licensePlate);
          const { licensePlate, ...data } = scooter;
          this.snack.update(`updated scooter ${scooter.licensePlate}`,"")
            return updateDoc(document, data);

        });
      })
    ).subscribe();
  }
  
	deleteScooter(licensePlate: string) {
		const document = doc(this.firestore, 'scooters', licensePlate);
    this.snack.delete(`deleted scooter ${licensePlate}`,"")
			return deleteDoc(document);
	}

  // this method returns a stream of documents mapped to their payload and id
  getScooters(): Observable<Scooter[]> {
    const contactsCollection = collection(this.firestore, 'scooters');
    return collectionData(contactsCollection, {idField: 'licensePlate'})
    .pipe(
      map(contacts => contacts as Scooter[])
    );
  }
}