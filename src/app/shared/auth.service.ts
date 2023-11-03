import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { User } from './models/user';
import { Observable, map } from 'rxjs';
import { doc, collection, setDoc, Firestore, docSnapshots, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Scooter } from './models/scooter';
import { Contract } from './models/contract';
import { Service } from './models/service';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

	constructor(private auth: Auth, private firestore: Firestore, private snack: SnackbarService, private router: Router) {}

	async register(userform: User) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, userform.email, userform.password);
			this.createUser(userform, user.user.uid);
			this.snack.add("Added your new account with the email: "+userform.email,"")
			this.router.navigate(['/log-in']);
			return user;
		} catch (e) {
			return null;
		}
	}
		
	async login({ email, password }) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			localStorage.setItem('token', JSON.stringify(user.user));
			return user;
		} catch (e) {
			return null;
		}
	}

	async google() {
		try {
			const user = await signInWithPopup(this.auth, new GoogleAuthProvider());
			localStorage.setItem('token', JSON.stringify(user.user));
			return user;
		} catch (e) {
			return null;
		}
	}

	async logout() {
		try {
			const user = await signOut(this.auth);
			localStorage.removeItem('token');
			return user;
		} catch (e) {
			return null;
		}
	}


	createUser(user: User, id: string): Promise<void> {
		console.log("user create"+user)
		const document = doc(collection(this.firestore, 'users'), id);
			return setDoc(document, user);
	}

	updateUser(user: User): Promise<void> {
		const document = doc(this.firestore, 'users', user.id);
		const { id, ...data } = user; // we don't want to save the id inside the document
			return updateDoc(document, data);
	}

	getUserById(id: string): Observable<User> {
		const document = doc(this.firestore, `users/${id}`);
		return docSnapshots(document)
		.pipe(map(doc => {
			const id = doc.id;
			const data = doc.data();
			return { id, ...data } as User;
			})
		);
	}	

	get isLoggedIn(): boolean {
		let authToken = localStorage.getItem('user_token');
		return authToken !== null ? true : false;
	}
}
