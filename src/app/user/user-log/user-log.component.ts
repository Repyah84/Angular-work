import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth.service';
import { PostsService, initUser } from '../../posts/post.seervice';
import { UserService, AuthRsponceData } from '../user.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent implements OnInit {

  appForm: FormGroup;

  error: string = '';

  isEroosMasege = false;

  isLoginMode = true;

  constructor(
    private authServ: AuthService,
    private postServ: PostsService,
    private userSer: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authServ.logout();

    if(!this.postServ.postsValue){
      this.postServ.getLoadPosts()
    }

    this.appForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'user-name': new FormControl('User', Validators.required)
    })

  }

  onSubmit(){
    if(!this.appForm.valid) return

    console.log(this.isLoginMode);

    const email = this.appForm.value.email;
    const password = this.appForm.value.password;
    
    let authOs: Observable<string | AuthRsponceData>;
    
    if(this.isLoginMode){
      authOs = this.userSer.onLogin(email, password);
    }else{
      authOs = this.userSer.onSingUp(email, password);
    }

    authOs.subscribe(response => {

      console.log(response);

      this.isEroosMasege = false;
      this.authServ.login();

      if(!this.isLoginMode){
        const user: initUser = {
          userId: this.userSer.userId,
          userName: this.appForm.value['user-name'],
        }

        this.postServ.createUser(user);
      }
      
      this.router.navigate(['/posts']);
    }, errorMessage => {
      this.isEroosMasege = true;
      this.error = errorMessage;
      this.authServ.logout();
    })
    
    console.log(this.appForm);

  }

}
