import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //it is property of class, so its mentioned here before constructor
  //creating reactive form for login
  //login form model
  loginForm = this.fb.group({ //control 
    //user entering feild
    //acno is just a variable
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]], //validators are provided inside []
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  login() {
    //check acno is having error
    // console.log(this.loginForm.get('acno')?.errors);
    // console.log(this.loginForm.get('pswd')?.errors);
    //no error: null
    //error : object
    
    //to check loginform is valid
    if(this.loginForm.valid){
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.pswd
      alert('login clicked')
      // console.log(this.loginForm.value);
      // console.log(acno, pswd);
    }
    else{
      alert('Invalid form')
    }
    


  }

}
