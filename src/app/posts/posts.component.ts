import { Component, OnInit, OnDestroy } from '@angular/core';

import { PostsService } from './post.seervice';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  userUnSub : Subscription;

  loadPosts = true;

  constructor(
    private postsServ: PostsService,
    private userServ: UserService
  ) {}

  ngOnInit() {
    if(this.postsServ.postsValue){
      this.postsServ.getLoadPosts();
      this.postsServ.loadPosts();
    }
   
    this.userUnSub = this.userServ.user.subscribe(user => {
      console.log('User Info', user)
    });
  }

  onDelite(id: string){
    this.postsServ.delitePost(id)
  }

  ngOnDestroy(){
    this.userUnSub.unsubscribe();
  }

}
