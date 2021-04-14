import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  email: any;
  password: any;
  loginForm: FormGroup;
  submitted = false;
  constructor(public  formBuilder: FormBuilder, public loginService: LoginService,  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username : ['', [Validators.required , Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  get formControlName() {
    return this.loginForm.controls;
  }
  doLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const formValue = this.loginForm.value;
      this.email   = formValue.username;
      this.password   = formValue.password;
      this.loginService.login(this.email,  this.password);

    }

  }
  ngOnDestroy() {
  }

}
