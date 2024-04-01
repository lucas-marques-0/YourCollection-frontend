import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private registrationService: RegistrationService, private router: Router) { }

  username: string = '';
  email: string = '';
  password: string = '';

  async registration() {
    if (!this.username || !this.email || !this.password) this.showAlert('Invalid username, email or password. Please try again.', 'error')
    else {
      const registration = await this.registrationService.registerUser({ username: this.username, email: this.email, password: this.password, collections: [] });
      if (!registration) {
        this.showAlert('Invalid username, email or password. Please try again.', 'error')
      } else {
        this.router.navigate(['/'])
        this.showAlert('You have been successfully registered, please log in!', 'success')
      }
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
