// auth.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service'
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
console.log("in auth effect")
@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({ username, password }) =>
            this.authService.login(username, password).pipe(
                map((response: any) => AuthActions.loginSuccess({ token: response.accessToken })),
                catchError(error => of(AuthActions.loginFailure({ error: error.message })))
            )
        ))
);

signup$ = createEffect(() => 
    this.actions$.pipe(
        ofType(AuthActions.signup),
        mergeMap(({ user }) => this.authService.signup(user.username, user.firstName, user.lastName, user.email, user.password).pipe(
            map((resposne: any) => {
                console.log(resposne);
                return resposne;
            }),
            tap(() => this.router.navigate(['/login'])),
            catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        ))
));

requestProfile$ = createEffect(() =>
    this.actions$.pipe(
    ofType(AuthActions.requestProfile),
    mergeMap(({ token }) =>
        this.authService.getDataFromToken(token).pipe(
            map((user: any) =>{ 
                return AuthActions.requestProfileSuccess({ user: user })}),
            tap(() => this.router.navigate(['/home'])),
            catchError(error => of(AuthActions.requestProfileFailure({ error: error.message })))
        )
    )
    )
);

    signout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.authService.signout()),
            tap(() => this.router.navigateByUrl('/login'))
        ), { dispatch: false }
    );
}
