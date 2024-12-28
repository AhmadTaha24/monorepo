import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) { }

    private handleError(error: any) {
        const errorObject = {
            name: 'Error',
            message: 'An unknown error occurred!',
            status: 0
        };
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorObject.message = `Error: ${error.error.message}`;
        } else {
            errorObject.message = `Error: ${error.error ? error.error.message : error.message}`;
            errorObject.status = error.status;
        }
        return throwError(() => new Error(errorObject.message));
    }

    login(username: string, password: string) {
        return this.http.post(environment.API_URL + 'auth/login', { username, password }).pipe(
            tap((response: any)=>localStorage.setItem('token', response.accessToken)),
            catchError(this.handleError)
        );
    }

    signup(username: string, firstName: string, lastName: string, email: string, password: string) {
        return this.http.post(environment.API_URL + 'users/create', { username, firstName, lastName, email, password }).pipe(
            catchError(this.handleError)
        );
    }

    getDataFromToken(accessToken: string) {
        const headers = new HttpHeaders({ authorization: `Bearer ${accessToken}`})
        return this.http.get(environment.API_URL + 'users/profile', { headers } ).pipe(
            catchError(this.handleError)
        );
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    signout() {
        localStorage.removeItem('token');
    }
    
}