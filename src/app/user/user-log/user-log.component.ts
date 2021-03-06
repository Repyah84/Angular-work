import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';

import { PostsService } from '../../posts/posts.service';
import { UserService, AuthRsponceData, InitUser} from '../user.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent implements OnInit {

  selectValue = '';

  appForm: FormGroup;

  error = '';

  isEroosMasege = false;

  isLoginMode = true;

  constructor(
    private postServ: PostsService,
    private userSer: UserService,
    private router: Router
  ) {}


  ngOnInit() {

    this.userSer.onLogout();

    if (!this.postServ.postsValue) {
      this.postServ.getLoadPosts();
    }

    this.appForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'user-name': new FormControl('User', Validators.required),
      age: new FormControl(null),
      height: new FormControl(null),
      weight: new FormControl(null),
      'select-height': new FormControl('inches'),
      'select-weight': new FormControl('pounds')
    });

  }


  initUser() {
    if (!this.appForm.valid) { return; }

    console.log(this.isLoginMode);

    const email = this.appForm.value.email;
    const password = this.appForm.value.password;

    let authOs: Observable<string | AuthRsponceData>;


    if (this.isLoginMode) {
      authOs = this.userSer.onLogin(email, password);
    } else {
      authOs = this.userSer.onSingUp(email, password);
    }

    authOs.subscribe(response => {

      console.log(response);

      this.isEroosMasege = false;

      if (!this.isLoginMode) {
        const user: InitUser = {
          userId: this.userSer.userId,
          userName: this.appForm.value['user-name'],
          userAge: this.appForm.value.age,
          userHeight: `${this.appForm.value.height}  ${this.appForm.value['select-height']}`,
          userWeight: `${this.appForm.value.weight}  ${this.appForm.value['select-weight']}`
        };

        this.userSer.createUser(user)
          .subscribe(() => {
            this.router.navigate(['/posts']);
          });
      } else {
        this.router.navigate(['/posts']);
      }


    }, errorMessage => {
      this.isEroosMasege = true;
      this.error = errorMessage;
    });

    console.log(this.appForm);

  }

  googleLog() {
    this.userSer.googleSingUp();
  }

  fasebookLog() {
    this.userSer.facebookSingUp();
  }

}
