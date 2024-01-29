import { Component, Input, computed, inject } from '@angular/core';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CandidatesService } from '../../../core/services/candidates.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/interfaces/user';

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
  candidatesService = inject(CandidatesService);
  //candidats = toSignal(this.candidatesService.getUsers());
  cnadidatesList = this.candidatesService.getUsers().subscribe(data => {
    this.data = data;
  });
}
