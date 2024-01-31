import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-data-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-tables.component.html',
  styleUrl: './data-tables.component.scss'
})
export class DataTablesComponent {
  @Input() data: any[] = [];
  
  getColumnNames() {
    if (this.data && this.data.length > 0) {
      return Object.keys(this.data[0]);
    } else {
      return [];
    }
  }

  getValues(row: any) {
    if (row) {
      return Object.values(row);
    } else {
      return [];
    }
  }

}
