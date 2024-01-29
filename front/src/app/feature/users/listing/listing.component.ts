import { Component } from '@angular/core';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [DataTablesComponent, RouterLink],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

}
