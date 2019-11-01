import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService, Post } from '../post.seervice';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  appForm: FormGroup;

  constructor(
    private postServ: PostsService,
    private userServ: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.appForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    const post: Post = {
      title: this.appForm.value.title, 
      content: this.appForm.value.content,
      userId: this.userServ.userId
    }
    this.postServ.makePost(post);
    this.appForm.reset();
    this.router.navigate(['/posts']);
  }
}
