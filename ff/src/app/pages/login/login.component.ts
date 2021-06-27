import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import { UsersApiService } from "../../services/users-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = { id: 0, username:"", password:""};
  constructor(private usersApi: UsersApiService, private router: Router) { }
  userData: User = {} as User;
  leng_users = 0;
  isOk = false
  isCorrect = false;
  ngOnInit(): void {
    this.usersApi.getAll().subscribe(response=> {
      this.leng_users = response.length;
    })
  }

  enter(item: User): void {
    if (this.userData.username === item.username && this.userData.password === item.password) {
      this.isCorrect= true;
    }
  }
  routex(): void {
    this.router.navigate(['letras'])
      .then(() => console.log('Navigated to Letras'))

  }
  identifyUser(): void {
    var b = false;
    for (let i = 1; i <= this.leng_users; i++){
      this.usersApi.getUserById(i).subscribe(response => {
        this.enter(response);
      })
    }
    console.log(this.isCorrect)
    if(this.isCorrect){
      this.routex()
    }else{
      alert('tamalitos')
    }
  }


}
