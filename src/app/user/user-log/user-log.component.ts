import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent implements OnInit {

  appForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.appForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    console.log(this.appForm)
  }

}
