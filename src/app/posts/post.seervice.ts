import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Post {
    title: string,
    content: string,
    id?: number
}

@Injectable({providedIn: 'root'})
export class PostsService {

    posts: Post[] = [
        {title: 'apple', content: 'some text'},
        {title: 'bread', content: 'some text'}
    ]

    constructor(private http: HttpClient){}

    makePost(title: string, content: string){
        const newPost: Post = {title, content}
        this.http.post<{[key: string]: Post}>('https://angular-progect.firebaseio.com/posts.json',
        newPost
        )
        .subscribe( responce => {
            console.log(responce)
        })
    }


    getPost(id: number){
        return this.posts[id]
    }

}