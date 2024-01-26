import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "../navigation/navigation.component";
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        RouterOutlet,
        NavigationComponent,
        SidebarComponent
    ]
})
export class DashboardComponent {

}
