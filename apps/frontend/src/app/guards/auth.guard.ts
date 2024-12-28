import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { lastValueFrom, map, Observable, take, tap } from 'rxjs';
import { AuthService } from './../services/auth.service'; // Import your authentication service


export const authGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const auth = inject(AuthService)

    let user!:any

    try{
        user = await lastValueFrom(auth.getDataFromToken(localStorage.getItem('token') || ''));
    }catch(err){
        user = false;
    }
    
    if(user){
        return true
    } else{
        router.navigate(['/login'])
        return false
    }
};
