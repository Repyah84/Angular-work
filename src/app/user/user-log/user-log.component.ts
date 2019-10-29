import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss']
})
export class UserLogComponent implements OnInit {

  appForm: FormGroup;

  constructor(
    private authServ: AuthService,
    private router: Router
    ) { }

  ngOnInit() {

    this.authServ.logout()

    this.appForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

  }

  onSubmit(){
    this.authServ.login();
    this.router.navigate(['/posts'])
    console.log(this.appForm)
  }

}
