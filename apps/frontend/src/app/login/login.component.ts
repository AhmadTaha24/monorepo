import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from './../store/auth/auth.actions';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    // constructor (private store: Store) {}
    errorMessage = "";
    private snackbar = inject(MatSnackBar);
    private store = inject(Store)
    private formBuilder = inject(FormBuilder)
    loginForm =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    onSubmit() {
        const terminate = new Subject();
        this.store.pipe(takeUntil(terminate)).subscribe((state)=>{
            console.log(state, state.auth.token)
            if (state.auth.token) {
                this.store.dispatch(AuthActions.requestProfile({ token: state.auth.token }));
                terminate.next('');
            } else if(state.auth.error) {
                this.snackbar.open("Incorrect username or password", '', { duration: 3000 });
            }
        })
        const { username, password } = this.loginForm.value;
        this.store.dispatch(AuthActions.login({username, password}));
    }
}