// auth.actions.ts
import { createAction, props } from '@ngrx/store';
console.log("in actions")
export const login = createAction('[Auth] Login', props<{ username: any; password: any }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const signup = createAction('[Auth] Signup', props<{ user: any }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ response: any }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

export const requestProfile = createAction('[Auth] Request Profile', props<{ token: any }>())
export const requestProfileSuccess = createAction('[Auth] Request Profile Success', props<{ user: any }>())
export const requestProfileFailure = createAction('[Auth] Request Profile Failure', props<{ error: any }>())

export const logout = createAction('[Auth] Logout');
