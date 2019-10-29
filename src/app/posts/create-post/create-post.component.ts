import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../post.seervice';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  appForm: FormGroup;

  constructor(private postServ: PostsService) { }

  ngOnInit() {
    this.appForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.postServ.makePost(this.appForm.value.title, this.appForm.value.content)
    console.log(this.appForm);
    this.appForm.reset();
  }
}
