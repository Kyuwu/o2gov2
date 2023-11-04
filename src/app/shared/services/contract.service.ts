import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Contract } from '../models/contract';
import { Scooter } from '../models/scooter';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

	constructor(private firestore: Firestore) {}

	//sets current contract and scooter to null for a given user
	deleteContract(user: User): Promise<void> {
		let contract = null;
		let scooter = null;
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				contract,
				scooter
			}
		);
	}

	//creates a new scooter contract for given user
	createContract(scooter: Scooter, contract: Contract,  user: User): Promise<void> {
		const document = doc(this.firestore, 'users', user.id);
			return updateDoc(document, {
				contract,
				scooter
			}
	);}
}
