import { Component, OnInit, Injectable } from '@angular/core';

import { PostsService } from './post.seervice';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  loadPosts = true;

  constructor(
    private postsServ: PostsService,
  ) {}

  ngOnInit() {
    if(this.postsServ.postsValue){
      this.postsServ.getLoadPosts();
      this.postsServ.loadPosts();
    }
  }

  onDelite(id: string){
    this.postsServ.delitePost(id)
  }

}
