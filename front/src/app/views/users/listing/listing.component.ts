import { Component, Input, computed, inject } from '@angular/core';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.scss',
    imports: [DataTablesComponent, RouterLink, CommonModule, TimeAgoPipe]
})
export class ListingComponent {
  usersService = inject(UsersService);
  authService = inject(AuthService);
  toaster = inject(ToastrService);
  candidatesList = toSignal(this.usersService.getUsersByRole('candidat'));


  actualUser = toSignal(this.authService.connectedUser(), { initialValue: {
    "languages": [],
    "interests": [],
    "firstName": null,
    "lastName": null,
    "email": null,
    "userName": null,
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

  toggleVerificationStatus(candidate: any): void {
    candidate.verified = !candidate.verified;
    
  }

  deletecandidate(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      (response) => {
        this.toaster.success('Candidat supprimé avec succès');
      },
      (error) => {
        console.log('Error deleting admin', error);
        this.toaster.error('Erreur lors de la suppression du candidat', error.error.error);
      }
    );
  }
}
