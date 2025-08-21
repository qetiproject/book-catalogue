import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  private _user: User | null = null;
  private _initiated = false;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      this._user = user as User | null;
      if (!this._initiated) {
        this._initiated = true;
      }
    });
  }

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  get initiated(): boolean {
    return this._initiated;
  }

  get userId(): string | null {
    return this._user?.uid ?? null;
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
