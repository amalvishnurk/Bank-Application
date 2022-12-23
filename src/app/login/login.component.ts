import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  eMsg = ""
  spin = ""
  

  //it is property of class, so its mentioned here before constructor
  //creating reactive form for login
  //login form model
  loginForm = this.fb.group({ //control 
    //create how much user entering feild required
    //acno is just a variable
    //user enetering details will reach here inside array, for tha bind reactive model and form in html
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]], //validators are provided inside []
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]//any no. of validators can be given 
  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }



  ngOnInit(): void {
  }
  login() {

    

    //check acno is having error
    // console.log(this.loginForm.get('acno')?.errors);
    // console.log(this.loginForm.get('pswd')?.errors);
    //no error: null
    //error : object

    //to check loginform is valid
    if (this.loginForm.valid) {
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.pswd

      // call login fn in services
      this.api.login(acno, pswd)
        .subscribe(
          //response 200
          (result: any) => {
            console.log(result);
            //now result have username coming from server
            //store it in the localstorage permanentaly
            localStorage.setItem('UserName', result.username)

            // store token and acno in local storage
            localStorage.setItem('token', result.token)
            localStorage.setItem('currentAcno', result.currentAcno)

            // alert(result.message)
            this.spin = result.message


            //redirect to dashboard
            setTimeout(() => {
              this.router.navigateByUrl('dashboard')
            }, 1500)

          },
          //respone 4xx
          (result: any) => {

            this.eMsg = result.error.message
            // alert(result.error.message)
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
