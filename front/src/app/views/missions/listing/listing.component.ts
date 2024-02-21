import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { MissionsService } from '../../../core/services/missions.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [DataTablesComponent, RouterLink, CommonModule, TimeAgoPipe, NgxPaginationModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  
  missionsService = inject(MissionsService);
  toaster = inject(ToastrService);
  currentPage : number = 1;
  missionsPerPage : number = 10;
  totalMissionsCount : number = 0;
  totalPages = 0 ;
  missions: any = [];
  getMissions(){
    this.missionsService.getAllMissions(this.currentPage, this.missionsPerPage)
      .subscribe((response: any) => {
        this.missions = response.missions;
        this.totalMissionsCount = response.totalMissionsCount;
        this.totalPages = Math.ceil(this.totalMissionsCount / this.missionsPerPage);
      });
    } 
  toggleVerificationStatus(mission: any): void {
    mission.published = !mission.published;
  }
  deletemission(arg0: any) {
  throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getMissions();
  }
  pageChangeEvent(event: number){
    this.currentPage = event;
    this.getMissions();
  }



}
