import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { collection, collectionData, doc, docSnapshots, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Service } from '../models/service';
import { base64ToFile } from 'ngx-image-cropper';
import { finalize, map, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SnackbarService } from './snackbar.service';
import { PhotoService } from './photo.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {

	constructor(private firestore: Firestore, private storage: AngularFireStorage, private snack: SnackbarService, private photo: PhotoService) {}

	//deletes the planned checkup given by the user
	deleteService(user: User): Promise<void> {
		let service = null;
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				service,
			}
		);
	}

	//create a services with uploaded camera picture to firebase storage to save database space
	createService(service: Service, user: User) {
		const filePath = `services/${user.email}`;
		console.log(service.photo)

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, base64ToFile(service.photo));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
					console.log(service.photo)
          service.photo = downloadURL;
          const document = doc(collection(this.firestore, 'services'), user.email);
          this.snack.update(`added checkup`,"")
            return setDoc(document, service);

        });
      })
    ).subscribe();
	}

	//gets checkup by id
	getServiceById(user: User): Observable<Service> {
		const document = doc(this.firestore, `services/${user.email}`);
		return docSnapshots(document)
		.pipe(map(doc => {
			const data = doc.data();
			return { ...data } as Service;
			})
		);
	}	

	// this method returns a stream of documents mapped to their payload and id
	getServices(): Observable<Service[]> {
		const contactsCollection = collection(this.firestore, 'services');
		return collectionData(contactsCollection, {idField: 'email'})
		.pipe(
			map(services => services as Service[])
		);
	}

}
