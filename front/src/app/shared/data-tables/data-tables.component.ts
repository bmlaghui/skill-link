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
  @Input() data: User[] = [];
  
 getColumnNames() {
    return Object.keys(this.data[0]);
  }

  getValues(row: User) {
    return Object.values(row);
  }

}
