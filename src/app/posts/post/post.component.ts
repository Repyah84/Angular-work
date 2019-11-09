import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post

  constructor(
    private postServ: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.postServ.postsValue)
    if(this.postServ.postsValue){
      this.post = JSON.parse(localStorage.getItem('post'))
    }
    else{
      this.route.params.subscribe((params: Params) => {
        this.post = this.postServ.getPost(params.id)
        localStorage.setItem('post', JSON.stringify(this.post))
        console.log('POST!!!!!!!!!!', this.post)
      })
    }
  }

  onBackTopst(){
    localStorage.removeItem('post');
    this.router.navigate(['/posts']);
  }

  onDelite(id: string){
    localStorage.removeItem('post');
    this.postServ.delitePost(id);
    this.router.navigate(['/posts']);
  }

}
