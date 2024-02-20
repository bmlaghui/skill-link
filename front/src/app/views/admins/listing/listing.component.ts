import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EntreprisesService } from '../../../core/services/entreprises.service';
import { Entreprise } from '../../../core/interfaces/entreprise';
import { toSignal } from '@angular/core/rxjs-interop';
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
import { PiechartComponent } from '../../../shared/piechart/piechart.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.scss',
    imports: [DataTablesComponent, RouterLink, CommonModule, TimeAgoPipe, PiechartComponent]
})
export class ListingComponent {

  data: User[] = [];
  usersService = inject(UsersService);
  toaster = inject(ToastrService);
  adminsList = toSignal (this.usersService.getUsersByRole('admin'));
  toggleVerificationStatus(admin: any): void {
    admin.verified = !admin.verified;
  }
  toggleActivationStatus(admin: any): void {
    admin.active = !admin.active;
  }

  authService = inject(AuthService);
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

  deleteAdmin(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      (response) => {
        this.adminsList = toSignal(this.usersService.getUsersByRole('admin'));
        this.toaster.success('Admin deleted successfully');
      },
      (error) => {
        console.log('Error deleting admin', error);
        this.toaster.error('Error deleting admin', error.message);

      }
    );

  }
  
}


