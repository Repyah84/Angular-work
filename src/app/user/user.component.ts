import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService, initUser } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  appForm: FormGroup;

  btnValue = 'Change';

  userInfo: initUser;
  
  constructor(private userServ: UserService) {}
  
  ngOnInit() {

    this.userServ.getUserInfo().subscribe(responseUser => {
      this.userInfo = responseUser;
    })    
    
    this.appForm = new FormGroup({
      'name': new FormControl(null,),
      'age': new FormControl(null,),
      'height': new FormControl(null,),
      'weight': new FormControl(null),
      'select-height': new FormControl('inches'),
      'select-weight': new FormControl('pounds')
    })

  }


  initUserInfo(){

    if(this.btnValue === 'Change'){
      this.btnValue = 'Save'
    }else{

    
      const userInfoUbdate: initUser = {
        userId: this.userInfo.userId,
        userName: this.appForm.value.name,
        userAge: this.appForm.value.age,
        userHeight: `${this.appForm.value.height}  ${this.appForm.value['select-height']}`,
        userWeight: `${this.appForm.value.weight}  ${this.appForm.value['select-weight']}`,
        id: this.userInfo.id
      }

      this.userServ.updateUserInfo(userInfoUbdate, this.userInfo.userId, this.userInfo.id)
        .subscribe(responseUserInfo => {
          this.userInfo = {
            userId: responseUserInfo.userId,
            userName: responseUserInfo.userName,
            userAge: responseUserInfo.userAge,
            userHeight: responseUserInfo.userHeight,
            userWeight: responseUserInfo.userWeight,
            id: responseUserInfo.id
          }
          // this.appForm.reset()
        })

      this.btnValue = 'Change';
    }
  }

}
