import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  appForm: FormGroup;

  btnValue = 'Change';
  
  constructor() { }

  ngOnInit() {
    this.appForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'second-name': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }


  onSubmit(){
    if(this.btnValue === 'Change'){
      this.btnValue = 'Save'
    }else{
      console.log(this.appForm);
      this.btnValue = 'Change'
    }
  }
}
