import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInForm } from '../auth/sign-in/sign-in.component';
import { SignUpForm } from '../auth/sign-up/sign-up.component';

interface User {
  uid: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  private _initiated = false;

  get initiated(): boolean {
    return this._initiated;
  }

  get userId(): string {
    return this._user.uid;
  }

  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      this._user = user;
      if (!this._initiated) {
        this._initiated = true;
      }
    });
  }

  signIn({ email, password }: SignInForm) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp({ email, password }: SignUpForm) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}
