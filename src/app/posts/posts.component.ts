import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  userUnSub: Subscription;

  loadPosts = true;

  constructor(
    private postsServ: PostsService,
  ) {}

  ngOnInit() {
    if (this.postsServ.postsValue) {
      this.postsServ.getLoadPosts();
      this.postsServ.loadPosts();
    }
  }

  onDelitePOst(id: string) {
    this.postsServ.delitePost(id);
  }

}
