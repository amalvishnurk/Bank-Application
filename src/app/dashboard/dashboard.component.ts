import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse = true
  user = ''
  balance = ''
  isLogout: boolean = false
  acno = ""
  deleteMsg = ""
  errorMsg = ""
  confirmMsg = false

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('UserName')) {
      this.user = localStorage.getItem('UserName') || '' //expecting string or null
    }

    if (!localStorage.getItem("token")) {
      alert("Please log In")
      this.router.navigateByUrl('')
    }

  }

  collapse() {
    this.isCollapse = !this.isCollapse
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


  // logout function
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("UserName")
    localStorage.removeItem("currentAcno")
    this.isLogout = true

    setTimeout(() => {
      this.router.navigateByUrl("")
    }, 2500)

  }


  // delete function
  deletes() {

    if (localStorage.getItem('currentAcno')) {
      this.acno = localStorage.getItem('currentAcno') || ''
    }

  }


  cancel() {
    this.acno = ""
  }


  // remove($event)
  remove(event: any) {
    // event is the acno of the acc to be deleted
    console.log(event);
    this.confirmMsg = event[1]
    this.api.deleteAccount(event[0])
      .subscribe(
        // response 200
        (result: any) => {

          this.acno = ""
          localStorage.removeItem("token")
          localStorage.removeItem("UserName")
          localStorage.removeItem("currentAcno")
          this.deleteMsg = result.message
          setTimeout(() => {
            this.router.navigateByUrl("")
          }, 2000)



        },
        // response 400
        (result) => {
          this.errorMsg = result.error.message
        }


      )

  }

}
