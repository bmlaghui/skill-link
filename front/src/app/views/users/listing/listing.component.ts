import { Component, Input, computed, inject } from '@angular/core';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [DataTablesComponent, RouterLink, CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  usersService = inject(UsersService);
  candidatesList = toSignal(this.usersService.getUsersByRole('candidat'));
  toggleVerificationStatus(candidate: any): void {
    candidate.verified = !candidate.verified;
    
  }
}
