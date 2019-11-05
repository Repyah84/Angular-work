import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


export class initProduct {
    img: string;
    title: string;
}

@Injectable({providedIn: 'root'})
export class CreatePostService {

    constructor(private http: HttpClient){}

    searcheItem(value: string){
        return this.http.get(
            `https://trackapi.nutritionix.com/v2/search/instant${value}`,
            {
                params: new HttpParams().set('x-app-key:', 'a8654bc1f5d68ed03f8e3ae59cb6aa25')
            }
        )
    }

    getItem(){
        this.http.get('')
    }

}