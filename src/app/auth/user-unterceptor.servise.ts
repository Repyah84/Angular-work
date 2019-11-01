import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UserInterceptor implements HttpInterceptor {

    constructor(private userServ: UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.userServ.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req)
                }
                const modifayRec = req.clone({
                    params: new HttpParams().set('auth', user.token)
                })
                return next.handle(modifayRec)
            })
        )
        
    }

}