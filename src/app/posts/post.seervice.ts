import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

export interface initUser {
    userId: string,
    userName: string,
}

export interface Post {
    title: string,
    content: string,
    id?: string,
}

@Injectable({providedIn: 'root'})
export class PostsService {

    postsValue = true;

    loadSpiner = null;

    posts: Post[] = [];

    idUser = '';

    constructor(
        private http: HttpClient,
        private userServ: UserService
    ){}

    createUser(user: initUser ){
        this.http.post<initUser>('https://angular-progect.firebaseio.com/users.json', user)
        .pipe(
            map((response: any) => {
                let getUserId: string;
                for(const key in response){
                    if(response.hasOwnProperty(key)){
                        getUserId = response.name
                    }
                }
                return getUserId
            })
        )
        .subscribe(response => {
            this.idUser = response
        })
    }

    makePost(post: Post){
        this.http.post<Post>(`https://angular-progect.firebaseio.com/users/-Lsb_48jYf0YDpSiOEf_/posts.json`, post)
            .pipe(
                map((response: any ) => {
                    console.log('!!!!!!!!!!!!!!!',response)
                    return {...post, id: response.name}})
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
                this.posts = response;
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