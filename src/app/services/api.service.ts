import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// to make header overload
// const is given above @Injectable
const options = {
  headers: new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //api call to login
  login(acno: any, pswd: any) {
    const body = {
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login', body) //get can be used but its round the nose, so use post
  }

  //api for register
  register(acno: any, pswd: any, uname: any) {
    const body = {
      acno,
      pswd,
      uname
    }
    return this.http.post('http://localhost:3000/register', body)
  }


  // function to append token in the request header
  appendToken() {
    const token = localStorage.getItem("token")
    // create header of http request
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }


  //api for deposit
  deposit(acno: any, pswd: any, amount: any) {
    const body = {
      acno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/deposit', body, this.appendToken())
  }


  // api for withdraw
  withdraw(acno: any, pswd: any, amount: any) {
    const body = {
      acno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/withdraw', body, this.appendToken())
  }


  // api for balance enquiry
  balance(acno: any) {
    const body = {
      acno
    }
    return this.http.post('http://localhost:3000/balance', body, this.appendToken())
  }


  // api for transaction
  transaction(acno: any) {
    const body = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction', body, this.appendToken())
  }


  // api for delete
  deleteAccount(acno: any) {
    return this.http.delete('http://localhost:3000/delete/'+acno, this.appendToken())
  }


}
