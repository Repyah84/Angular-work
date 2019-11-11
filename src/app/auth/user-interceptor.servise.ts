import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { CreatePostService } from '../posts/create-post/create-post.service';


@Injectable({
    providedIn: 'root'
})
export class UserInterceptor implements HttpInterceptor {

    constructor(
        private userServ: UserService,
        private crestePosrServe: CreatePostService
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        if(this.crestePosrServe.ininSearche){
            return next.handle(req);
        }
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