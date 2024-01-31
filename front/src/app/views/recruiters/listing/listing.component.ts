import { Component, inject } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';

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
  candidatesList = this.usersService.getRecruiters().subscribe(data => {
    if(data) {
      this.data = data;
    }
    else {
      this.data = [];
    }
  });
}
