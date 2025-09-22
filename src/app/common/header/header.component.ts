import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  lan: any;
  constructor(private router: Router) {
  }

  logOut() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}
