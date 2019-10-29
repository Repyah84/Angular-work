import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private authServ: AuthService,
        private router: Router
        ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean
        {
            return this.authServ.identification().then( inAuth => {
                if(inAuth){
                    return true;
                } else {
                    this.router.navigate(['/user-log']);
                }
            })
    }
}