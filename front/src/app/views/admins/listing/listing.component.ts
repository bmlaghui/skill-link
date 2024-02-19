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

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [DataTablesComponent, RouterLink, CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

  data: User[] = [];
  usersService = inject(UsersService);
  adminsList = toSignal (this.usersService.getUsersByRole('admin'));
  toggleVerificationStatus(admin: any): void {
    admin.verified = !admin.verified;
  }
}


