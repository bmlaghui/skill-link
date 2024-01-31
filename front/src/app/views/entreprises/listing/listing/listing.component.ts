import { Component, inject } from '@angular/core';
import { Entreprise } from '../../../../core/interfaces/entreprise';
import { DataTablesComponent } from "../../../../shared/data-tables/data-tables.component";
import { RouterLink } from '@angular/router';
import { EntreprisesService } from '../../../../core/services/entreprises.service';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.scss',
    imports: [DataTablesComponent, RouterLink]
})
export class ListingComponent {
  data: Entreprise[] = [];
  entreprisesService = inject(EntreprisesService);
  //candidats = toSignal(this.candidatesService.getUsers());
  entreprisesList = this.entreprisesService.getEntreprises().subscribe(data => {
    if(data) {
      this.data = data;
    }
    else {
      this.data = [];
    }
  });
}
