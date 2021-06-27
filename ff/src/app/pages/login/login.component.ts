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
  isOk = false;
  isCorrect = false;

  ngOnInit(): void {
    this.usersApi.getAll().subscribe(response=> {
      this.leng_users = response.length;
    })
  }
  routex() {
    this.router.navigate(['letras'])
      .then(() => console.log('Navigated to Letras'));
  }
  identifyUser() : void {
    for(let i = 1; i<= this.leng_users;i++)
    {
      this.usersApi.getUserById(i).subscribe(response=>{
        if(response.username === this.userData.username){
          if(response.password === this.userData.password){
            this.routex();
          }
        }
      })
    }
  }

  createUserRoute()  {
    this.router.navigate(['user/new'])
      .then(() => console.log('Creating a user'));
  }
}
