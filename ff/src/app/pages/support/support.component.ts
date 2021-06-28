import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  navigateToHome(){
    this.router.navigate(['letras'])
      .then(() => console.log('Creating a user'));
  }
}
