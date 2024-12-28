import { Route } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: 'home',
        component: ProfileComponent,
        canActivate: [authGuard]
    }
];
