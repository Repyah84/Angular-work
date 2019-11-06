import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


export class initProduct {
    foodName: string;
    imege: string;
    id?: string;
    calories?: number
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
                    'x-app-key':'a8654bc1f5d68ed03f8e3ae59cb6aa25',
                })
            }
        ).pipe(
            map(responseFoods => {
                const foodsArrey: initProduct[] = [];
                for(const key in responseFoods){
                    if(key === 'common'){
                        responseFoods[key].map(responseFoods => {
                            foodsArrey.push(
                                {
                                    foodName: responseFoods.food_name, 
                                    imege: responseFoods.photo.thumb,
                                    id: responseFoods.tag_id
                                }
                            )
                            return foodsArrey
                        })
                        return foodsArrey
                    }
                }
            })
        )
    }

    getItem(fodName: string){
        const food = {"query": fodName}
        return this.http.post(
            `https://trackapi.nutritionix.com/v2/natural/nutrients`,
            food,
            {
                headers: new HttpHeaders({
                    'Content-Type':'application/json',
                    'x-app-id':'505ea1f5',
                    'x-app-key':'a8654bc1f5d68ed03f8e3ae59cb6aa25',
                })
            }
        ).pipe(
            map(rsponseFood => {
                let food: initProduct;
                for(const key in rsponseFood){
                    if(key === 'foods'){
                        rsponseFood[key].map(responseFood => {
                            return food = {
                                foodName: responseFood.food_name,
                                imege: responseFood.photo.thumb,
                                calories: +responseFood.nf_calories
                            }
                        })
                        return food
                    }
                }
            })
        )
    }

}