import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FooterComponent, SettingsPanelComponent, RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

}
