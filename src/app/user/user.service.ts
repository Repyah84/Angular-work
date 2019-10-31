import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { User } from '../auth/user.module';


export interface AuthRsponceData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}
 
@Injectable({providedIn:'root'})
export class UserService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){}

    onSingUp(email: string, password: string){
        return this.http.post<AuthRsponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgXrwXWurZ4z7eWUqi1zo6NppyznPkLTo',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handlerError),
            tap((resData: any) => {
                this.hendlerAutonotification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
            })
        );
    }

    onLogin(email: string, password: string){
        return this.http.post<AuthRsponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgXrwXWurZ4z7eWUqi1zo6NppyznPkLTo',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handlerError), 
            tap((resData: any) => {
                this.hendlerAutonotification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
            })
        );
    }


    private hendlerAutonotification(
        email: string,
        localId: string,
        idToken: string,
        expiresIn: number
    ){
        const epirationData = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, idToken, epirationData);
        this.user.next(user);
    }

    private handlerError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error ccured';
                if(!errorRes.error || !errorRes.error.error){
                    return errorMessage
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exist olready';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exist';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'This password is not correct';
                        break;
                }
            return throwError(errorMessage)
    }
}