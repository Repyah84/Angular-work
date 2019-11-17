import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../auth/user.module';

export interface InitUser {
    userId: string;
    userName: string;
    userAge?: number;
    userHeight?: string;
    userWeight?: string;
    id?: string;
}


export interface AuthRsponceData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class UserService {

    userId = '';

    // tslint:disable-next-line:variable-name
    private _tokenExpirationTimer: any;

    user = new BehaviorSubject<User>(null);

    constructor(
        private afAuth: AngularFireAuth,
        private http: HttpClient,
        private router: Router,
    ) {}

    async facebookSingUp() {
        const provider = new auth.FacebookAuthProvider();
        const credential: any = await this.afAuth.auth.signInWithPopup(provider);
        console.log('USER$_RESPONSE', credential.user);
        const tokenExpirationTime = 3600;
        const user: InitUser = {
            userId: credential.user.uid,
            userName: credential.user.displayName
        };
        this.hendlerAutonotification(
            credential.user.email,
            credential.user.uid,
            credential.user.ma,
            tokenExpirationTime
        );
        this.getUserInfo(credential.user.uid)
          .pipe(
            switchMap(response => {
              console.log('MAP_RESPONSE', response);
              if (!response) {
                return this.createUser(user, credential.user.uid);
              }
              return of();
            })
          )
          .subscribe({
            complete: () => this.router.navigate(['/posts'])
          });
    }


    async googleSingUp() {
        const provider = new auth.GoogleAuthProvider();
        const credential: any = await this.afAuth.auth.signInWithPopup(provider);
        console.log('USER$_RESPONSE', credential.user);

        const tokenExpirationTime = 3600;
        const user: InitUser = {
            userId: credential.user.uid,
            userName: credential.user.displayName
        };
        this.hendlerAutonotification(
            credential.user.email,
            credential.user.uid,
            credential.user.ma,
            tokenExpirationTime
        );
        this.getUserInfo(credential.user.uid)
          .pipe(
            switchMap(response => {
              console.log('MAP_RESPONSE', response);
              if (!response) {
                return this.createUser(user, credential.user.uid);
              }
              return of();
            })
          )
          .subscribe({
            complete: () => this.router.navigate(['/posts'])
          });
    }


    createUser(user: InitUser, userId = this.userId ) {
        return this.http.post<InitUser>(`https://angular-progect.firebaseio.com/USER_${userId}/user_info.json`, user);
    }


    getUserInfo(userId = this.userId) {
        return this.http.get(`https://angular-progect.firebaseio.com/USER_${userId}/user_info.json`)
            .pipe(
               map((responseUserInfo) => {
                   let userInfo: any;
                   for (const key in responseUserInfo) {
                       if (responseUserInfo.hasOwnProperty(key)) {
                           userInfo = {...responseUserInfo[key], id: key};
                       }
                   }
                   return userInfo;
               })
            );
    }


    updateUserInfo(user: InitUser, userId = this.userId, id: string) {
        return this.http.put(`https://angular-progect.firebaseio.com/USER_${userId}/user_info/${id}.json`, user)
            .pipe(
               tap((userInfo: InitUser) => {
                   return userInfo;
               })
            );
    }


    onSingUp(email: string, password: string) {
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
                );
            })
        );
    }


    onLogin(email: string, password: string) {
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
                console.log('RESPONSE_DATA', resData);
                this.hendlerAutonotification(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    onLogout() {
        this.user.next(null);
        localStorage.clear();
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }

        this._tokenExpirationTimer = null;
    }


    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationData: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadeUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationData)
        );

        if (loadeUser.token) {
            this.userId = userData.id;
            this.user.next(loadeUser);
            const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    autoLogout(expirationDuration: number) {
        this._tokenExpirationTimer = setTimeout(() => {
            this.onLogout();
            this.router.navigate(['/user-log']);
        }, expirationDuration);
    }


    private hendlerAutonotification(
        email: string,
        localId: string,
        idToken: string,
        expiresIn: number
    ) {
        const epirationData = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, idToken, epirationData);
        this.userId = localId;
        this.user.next(user);
        console.log('OB_USER', this.user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }


    private handlerError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error ccured';
        if (!errorRes.error || !errorRes.error.error) {
                return errorMessage;
            }
        switch (errorRes.error.error.message) {
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
        return throwError(errorMessage);
    }
}
