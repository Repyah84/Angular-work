import { Injectable } from '@angular/core';

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

    getPost(id: number){
        return this.posts[id]
    }
}