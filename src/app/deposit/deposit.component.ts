import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  eMsg = ''
  user=''
  balance = ''


  depositForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9A-Za-z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })

  constructor(private fb: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem('UserName')){
      this.user=localStorage.getItem('UserName') || '' //expecting string or null
    }
  }

  deposit() {

    if (this.depositForm.valid) {
      let acno = this.depositForm.value.acno
      let pswd = this.depositForm.value.pswd
      let amount = this.depositForm.value.amount

      // call deposit fn in services
      this.api.deposit(acno, pswd, amount)
        .subscribe(
      //     //response 200
          (result: any) => {
            console.log(result);
            alert(result.message)

            // auto refresh
            this.depositForm.reset()

          },
      //     //respone 4xx
          (result: any) => {
            this.eMsg = result.error.message
            this.depositForm.reset()

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



  getBalance() {
    if (acno = localStorage.getItem('currentAcno')) {
      var acno = localStorage.getItem('currentAcno')
    }

    this.api.balance(acno)
      .subscribe(
        // response 2xx
        (result: any) => {
          this.balance = result.message
          console.log(this.balance);
          
        },
        // response 4xx

        (result: any) => {
          this.balance = result.error.message
        }

      )
  }



}


