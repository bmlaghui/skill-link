import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';
import { RouterModule } from '@angular/router';
import { IdleService } from '../../../core/services/idle.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FooterComponent, SettingsPanelComponent, RouterModule, CommonModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent implements OnInit, OnDestroy{
  idleService = inject(IdleService);
  private idleSubscription?: Subscription;
  toaster = inject(ToastrService);
  authService = inject(AuthService);


  ngOnInit(): void {
    this.idleService.idleState.subscribe((isIdle) => {
      if (isIdle) {
        this.toaster.warning('Vous êtes inactif depuis un moment, vous allez être déconnecté dans 10 secondes');        
      } 
    });
  }
  
  ngOnDestroy(): void {
    if(this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
    throw new Error('Method not implemented.');
  }

  onUserAction() {
    this.idleService.resetTimer();
  }

}
