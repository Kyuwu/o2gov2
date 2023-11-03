import { Injectable } from '@angular/core';
import { User } from './models/user';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Service } from './models/service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {

	constructor(private firestore: Firestore) {}

	deleteService(user: User): Promise<void> {
		let service = null;
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				service,
			}
		);
	}

	createService(service: Service, user: User): Promise<void> {
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				service,
			}
	);}
}
