import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
constructor(private router:Router){}
  navigateTodo() {
    this.router.navigate(['/todo']);
  }
}
