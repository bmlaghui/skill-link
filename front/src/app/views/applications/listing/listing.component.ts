import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApplicationsService } from '../../../core/services/applications.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, DataTablesComponent, RouterLink, TimeAgoPipe],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  applicationsService = inject(ApplicationsService);
  toaster = inject(ToastrService);
  currentPage : number = 1;
  applicationsPerPage : number = 10;
  totalApplicationsCount : number = 0;
  totalPages = 0 ;
  applications: any = [];
  getApplications(){
    this.applicationsService.getAllApplications(this.currentPage, this.applicationsPerPage)
      .subscribe((response: any) => {
        console.log(response);
        this.applications = response.applications;
        this.totalApplicationsCount = response.totalApplicationsCount;
        this.totalPages = Math.ceil(this.totalApplicationsCount / this.applicationsPerPage);
      });
    } 
  toggleVerificationStatus(application: any): void {
    application.published = !application.published;
  }
  deleteapplication(arg0: any) {
  throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getApplications();
  }
  pageChangeEvent(event: number){
    this.currentPage = event;
    this.getApplications();
  }
}
