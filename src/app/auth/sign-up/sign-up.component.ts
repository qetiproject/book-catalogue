import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService, LoadingService } from 'src/app/services';
export interface SignUpForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  signUp(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    if (!email || !password) {
      return;
    }

    this.loadingService.start();
    from(this.auth.signUp({ email, password }))
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => this.router.navigate(['catalogue']));
  }
}
