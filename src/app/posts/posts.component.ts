import { Component, OnInit, Injectable } from '@angular/core';

import { PostsService } from './post.seervice';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private postsServ: PostsService) { }

  ngOnInit() {
  }

}
