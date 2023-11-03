import { Injectable } from '@angular/core';
import { User } from './models/user';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Contract } from './models/contract';
import { Scooter } from './models/scooter';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

	constructor(private firestore: Firestore) {}

	deleteContract(user: User): Promise<void> {
		let contract = null;
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				contract,
			}
		);
	}

	createContract(contract: Contract, scooter: Scooter, user: User): Promise<void> {
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				contract,
				scooter
			}
	);}
}
