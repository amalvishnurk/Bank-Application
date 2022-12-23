import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  eMsg=''

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[0-9A-Za-z]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9A-Za-z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    if (this.registerForm.valid) {
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      let uname = this.registerForm.value.username

      // call register fn in services
      this.api.register(acno, pswd, uname)
        .subscribe(
          //response 200
          (result: any) => {
            console.log(result);
            alert(result.message)

            //redirect to login
            this.router.navigateByUrl('')

          },
          //respone 4xx
          (result: any) => {
            this.eMsg = result.error.message
          }
        )
      // alert('login clicked')
      // console.log(this.loginForm.value);
      // console.log(acno, pswd);
    }
    else {
      alert('Invalid form')
    }

  }

}
