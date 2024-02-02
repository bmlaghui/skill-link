import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TimeAgoPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  actualUser = toSignal(this.authService.connectedUser(), { initialValue: {
    "languages": [],
    "interests": [],
    "firstName": null,
    "lastName": null,
    "email": null,
    "username": null,
    "phoneNumber": null,
    "role": null,
    "address": null,
    "description": null,
    "linkLinkedin": null,
    "linkGithub": null,
    "linkWebsite": null,
    "linkCV": null,
    "image": null,
    "skills": [],
    "verified": null,
    "notifications": [],
    "experiences": [],
    "diplomas": [],
    "missions": [],
    "applications": [],
    "createdAt": null,
    "updatedAt": null
  }  }); 

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    },
    (error) => {
      console.log("An error occured while logging out", error);
      });
  }
}
