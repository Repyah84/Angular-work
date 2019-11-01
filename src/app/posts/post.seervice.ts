import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap, filter } from 'rxjs/operators';
import { UserService } from '../user/user.service';


export interface Post {
    title: string,
    content: string,
    userId?: string,
    id?: string
}

@Injectable({providedIn: 'root'})
export class PostsService {

    postsValue = true;

    loadSpiner = null;

    posts: Post[] = [];

    constructor(
        private http: HttpClient,
        private userServ: UserService
    ){}

    makePost(post: Post){
        this.http.post<Post>('https://angular-progect.firebaseio.com/posts.json', post)
            .pipe(
                map((response: any ) => {return {...post, id: response.name}})
            )
            .subscribe(post => {
                this.addPost(post);
            });
    }
    
    loadPosts(){
        this.loadSpiner = true;
        this.http.get<{[key: string]: Post}>('https://angular-progect.firebaseio.com/posts.json')
            .pipe(
                map(responsePost => {
                    const arreyPosts: Post[] = [];
                    for(const key in responsePost){
                        if(responsePost.hasOwnProperty(key)){
                            arreyPosts.push({...responsePost[key], id:key})
                        }
                    }
                    return arreyPosts;
                })
            )   
            .subscribe(response => {
                // this.posts = response;
                this.posts = response.filter(responsePost => responsePost.userId === this.userServ.userId);
                this.loadSpiner = false;
        })
    }

    delitePost(id: string){
        this.http.delete(`https://angular-progect.firebaseio.com/posts/${id}.json`)
        .subscribe(() => {
            const deliteElem = this.posts.findIndex(item => item.id === id)
            this.posts.splice(deliteElem, 1);
        })
    }
    
    getLoadPosts(){
        this.postsValue = !this.postsValue;
    }

    addPost(post: Post){
        this.posts.push(post)
    }
    
    getPost(id: string){
        return this.posts.find(item => item.id  === id)
    }

}