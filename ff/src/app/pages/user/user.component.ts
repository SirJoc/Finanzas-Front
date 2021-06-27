import { Component, OnInit } from '@angular/core';
import {UsersApiService} from "../../services/users-api.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData : User = {} as User;
  hide = true;
  constructor(private usersApi: UsersApiService, private router: Router) { }

  addSUser(){
    this.usersApi.addUser(this.userData).subscribe(() =>{
      this.routesToLogin();
    })
  }

  routesToLogin(){
    this.router.navigate([''])
      .then(() => console.log('Logging'));
  }

  ngOnInit(): void {
  }

}
