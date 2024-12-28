// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

const initialState: any = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    test: false
};


export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({ ...state, isLoading: true, error: null, })),
    on(AuthActions.loginSuccess, (state, { token }) => ({
        ...state,
        token: token,
        isAuthenticated: true,
        error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(AuthActions.logout, () => initialState),

    on(AuthActions.signup, (state) => ({ ...state, isLoading: true })),
    on(AuthActions.signupSuccess, (state) => ({
        ...state,
        error: null,
    })),
    on(AuthActions.signupFailure, (state, { error }) => ({
        ...state,
        error,
    })),

    on(AuthActions.requestProfile,  (state) => ({ ...state, isLoading: true })),
    on(AuthActions.requestProfileSuccess, (state, { user }) => ({
        ...state,
        user: user,
        isAuthenticated: true,
        error: null,
    })),
    on(AuthActions.requestProfileFailure, (state, { error }) => ({
        ...state,
        error,
  })),
);
