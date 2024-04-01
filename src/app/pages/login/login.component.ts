import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  email: any = '';
  password: any = '';

  async login() {
    const loginUser = await this.loginService.login(this.email, this.password);
    if(loginUser.user) {
      localStorage.setItem('session', loginUser.session.access_token)
      localStorage.setItem('userId', loginUser.user.id)
      this.router.navigate(['/home'])
    } else {
      this.showAlert('Invalid username or password. Please try again.', 'error')
    }
  }

  showAlert(message: any, type: any) {
    Swal.fire({
      title: message,
      icon: type,
      confirmButtonText: 'Got it!'
    });
  }
}
