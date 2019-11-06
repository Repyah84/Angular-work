import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class initProduct {
    img: string;
    title: string;
}

@Injectable({providedIn: 'root'})
export class CreatePostService {

    ininSearche = false;

    constructor(private http: HttpClient){}

    searcheItem(value: string){

        return this.http.get(
            `https://trackapi.nutritionix.com/v2/search/instant?query=${value}`,
            {
                headers: new HttpHeaders({
                    'x-app-id':'505ea1f5',
                    'x-app-key':'a8654bc1f5d68ed03f8e3ae59cb6aa25'
                })
            }
        )
    }

    getItem(){
        this.http.get('')
    }

}