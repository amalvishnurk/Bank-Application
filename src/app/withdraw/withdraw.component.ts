import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  eMsg = ''
  user=''
  balance = ''


  withdrawForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9A-Za-z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem('UserName')){
      this.user=localStorage.getItem('UserName')|| ""
    }
  }


  withdraw() {

    if (this.withdrawForm.valid) {
      let acno = this.withdrawForm.value.acno
      let pswd = this.withdrawForm.value.pswd
      let amount = this.withdrawForm.value.amount

      // call withdraw fn in services
      this.api.withdraw(acno, pswd, amount)
        .subscribe(
          //     //response 200
          (result: any) => {
            console.log(result);
            alert(result.message)
            this.withdrawForm.reset()
          },

          //respone 4xx
          (result: any) => {
            this.eMsg = result.error.message
            // to remove msg after 3s 
            setTimeout(()=>{
              this.eMsg=""
            },3000)

            this.withdrawForm.reset()

          }
        )
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

