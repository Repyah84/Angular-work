import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from '../post.seervice';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post

  constructor(
    private postServ: PostsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.post = this.postServ.getPost(+params.id)
    })
  }

}
