import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
    inOuth = false

    login(){
        this.inOuth = true;
        console.log(this.inOuth);
    }
    logout(){
        this.inOuth = false;
        console.log(this.inOuth);
    }

    identification(): Promise<boolean>{
        return new Promise(resolve => {
            resolve(this.inOuth)
        })
    }
}