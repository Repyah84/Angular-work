import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router, 
    UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private userServ: UserService,
        private router: Router
        ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
        {
            return this.userServ.user.pipe(
                take(1),
                map(user => {
                    const isAuth = !!user;
                    if(isAuth){
                        return true;
                    }
                    return this.router.createUrlTree(['/user-log']);
                })
            )
        }
}