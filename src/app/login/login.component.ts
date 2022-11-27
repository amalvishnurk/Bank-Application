import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
    acno:[''], //acno is just a variable
    pswd:['']
  })

    constructor(private fb: FormBuilder) { }

ngOnInit(): void {
}
login(){
  let acno=this.loginForm.value.acno
  let pswd=this.loginForm.value.pswd
  // alert('login clicked')
  // console.log(this.loginForm.value);
  console.log(acno, pswd);
  
  
}

}
