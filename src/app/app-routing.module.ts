import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './posts/post/post.component';
import { UserComponent } from './user/user.component';
import { UserLogComponent } from './user/user-log/user-log.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { PostsComponent } from './posts/posts.component';


const routes: Routes = [
  {path: '', redirectTo: '/user-log', pathMatch: 'full'},
  {path: 'posts', component: PostsComponent, children: [
    {path: ':id', component: PostComponent},
  ]},
  {path: 'user', component: UserComponent},
  {path: 'user-log', component: UserLogComponent},
  {path: 'user-profile', component: UserProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
