import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, provideState } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { provideStoreDevtools} from '@ngrx/store-devtools'
import { AuthEffects } from './store/auth/auth.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    // provideStore(),
    provideHttpClient(),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit:75
    }),
    provideStore({ auth: authReducer}),
    // provideState({ name: 'Auth', reducer: authReducer }),
    provideEffects([AuthEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes), provideAnimationsAsync(),
  ],
};
