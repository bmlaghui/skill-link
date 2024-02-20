import { Component, inject } from '@angular/core';
import { Entreprise } from '../../../../core/interfaces/entreprise';
import { DataTablesComponent } from "../../../../shared/data-tables/data-tables.component";
import { RouterLink } from '@angular/router';
import { EntreprisesService } from '../../../../core/services/entreprises.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  entreprisesList = toSignal(this.entreprisesService.getEntreprises());
}
