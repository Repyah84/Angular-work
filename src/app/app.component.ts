import { Component, OnInit } from '@angular/core';

import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-food';

  constructor(
    private userServ: UserService,
    ){}

  ngOnInit(){
    this.userServ.autoLogin()
  }

}
