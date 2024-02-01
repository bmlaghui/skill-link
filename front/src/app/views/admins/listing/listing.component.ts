import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EntreprisesService } from '../../../core/services/entreprises.service';
import { Entreprise } from '../../../core/interfaces/entreprise';

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
  
  
  //candidats = toSignal(this.candidatesService.getUsers());
  adminsList = this.usersService.getUsersByRole('admin').subscribe(data => {
    if(data) {
      this.data = data;
    }
    else {
      this.data = [];
    }
  });
}


