import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from '../post.seervice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

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
    this.route.params.subscribe((params: Params) => {
      this.post = this.postServ.getPost(params.id)
    })
  }

  onDelite(id: string){
    this.postServ.delitePost(id);
    this.router.navigate(['/posts']);
  }

}
