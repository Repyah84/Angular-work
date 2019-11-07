import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostsService, Post } from '../post.seervice';
import { CreatePostService, initProduct } from './create-post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('inNput', {static: false}) input: ElementRef;

  appForm: FormGroup;

  calories 

  itemsSearch: initProduct[] = [];

  showFoods: initProduct[] = [];

  constructor(
    private postServ: PostsService,
    private createPostServ: CreatePostService,
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
    }
    this.postServ.makePost(post);
    this.appForm.reset();
    this.router.navigate(['/posts'])
  }


  onSearch(value: string){
    if(!value){
      this.itemsSearch.length = 0;
      return;
    } 
      
    this.createPostServ.ininSearche = true;
    this.createPostServ.searcheItem(value)
      .subscribe(item => {
        this.itemsSearch = item;
        this.createPostServ.ininSearche = false;  
      })
  }

  onClick(fodName: string){

    this.createPostServ.ininSearche = true;
    this.createPostServ.getItem(fodName)
      .subscribe(response => {
        this.itemsSearch.length = 0;
        this.input.nativeElement.value = '';
        this.showFoods.push(response)
        this.createPostServ.ininSearche = false;
      })
  }


  onMinus(index: number){
    if(this.showFoods[index].amount === 1) return;
    const amount = this.showFoods[index].amount;
    const calories = this.showFoods[index].calories / amount;
    this.showFoods[index].calories = +(this.showFoods[index].calories - calories).toFixed(2);
    this.showFoods[index].amount--
  }

  onPlas(index: number){
    const amount = this.showFoods[index].amount;
    const calories = this.showFoods[index].calories / amount;
    this.showFoods[index].calories = +(this.showFoods[index].calories + calories).toFixed(2);
    this.showFoods[index].amount++
  }


}
