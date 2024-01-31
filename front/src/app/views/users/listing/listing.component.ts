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
  data: User[] = [];
  candidates: User[] = [];
  usersService = inject(UsersService);
  //candidats = toSignal(this.candidatesService.getUsers());
  candidatesList = this.usersService.getUsersByRole('candidat').subscribe(data => {
    if(data) {
      this.data = data;
    }
    else {
      this.data = [];
    }
  });
}
