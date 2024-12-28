import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { defaultIfEmpty, filter, map, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import * as AuthActions from './../store/auth/auth.actions';

@Component({
    selector: 'app-profile',
    imports: [
        CommonModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent {
    store = inject(Store);
    private authService = inject(AuthService);

    userData: any;

    ngOnInit() {
        this.store.pipe(
            take(1),
            tap(user => console.log(user)),
            map((state: any) => state?.auth?.user),
            filter(user => user),
            tap(user => console.log(user)),
            tap(user => this.userData = user),
            defaultIfEmpty(false),
            switchMap((user) => {
                if (user) return of(user);
                else return this.authService.getDataFromToken(localStorage.getItem('token') || '').pipe(
                    tap(user => console.log(user)),
                    tap(user => this.userData = user)
                );
            })
        ).subscribe(() => console.log(this.userData));
    }
    logout() {
        this.store.dispatch(AuthActions.logout());
    }
}
