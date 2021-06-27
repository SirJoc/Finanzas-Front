import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import { UsersApiService } from "../../services/users-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = { id: 0, username:"", password:""};
  constructor(private usersApi: UsersApiService) { }
  userData: User = {} as User;
  isCorrect = false;
  ngOnInit(): void {
    this.usersApi.getUserById(2).subscribe(response => {
      console.log(response);
      console.log(response.username);
    })
  }

  getUserById(id: number): void {
    this.usersApi.getUserById(id).subscribe(
      (response: any) => {
        this.user = response.data;
      }
    )
  }

  enter(): boolean {
    if (this.userData.username === this.user.username && this.userData.password === this.user.password) {
      return true;
    }else {
      return false;
    }
  }
}
