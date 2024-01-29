import { Component, inject } from '@angular/core';
import { CandidatesService } from '../../../core/services/candidates.service';
import { Entreprise } from '../../../core/interfaces/entreprise';
import { DataTablesComponent } from "../../../shared/data-tables/data-tables.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.scss',
    imports: [DataTablesComponent, RouterLink]
})
export class ListingComponent {
  data: Entreprise[] = [];
  candidates: Entreprise[] = [];
  candidatesService = inject(CandidatesService);
  //candidats = toSignal(this.candidatesService.getUsers());
  cnadidatesList = this.candidatesService.getUsers().subscribe(data => {
    this.data = data;
  });
}
