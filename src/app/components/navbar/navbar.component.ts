import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private navbarService: NavbarService, private router: Router) { }

  async signOut() {
    const signOut = await this.navbarService.signOut()
    if(signOut.success) {
      await localStorage.clear();
      this.router.navigate(['']);
    }
  }
}
