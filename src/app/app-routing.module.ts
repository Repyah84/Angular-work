import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './posts/post/post.component';
import { UserComponent } from './user/user.component';
import { UserLogComponent } from './user/user-log/user-log.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/user-log', pathMatch: 'full'},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuard], children: [
    {path: ':id', component: PostComponent},
  ]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user-log', component: UserLogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
