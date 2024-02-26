import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApplicationsService } from '../../../core/services/applications.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { RemoveSpecialCharactersPipe } from '../../../core/pipes/remove-special-characters.pipe';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, DataTablesComponent, RouterLink, TimeAgoPipe, RemoveSpecialCharactersPipe],
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
  getStepsLabels(statut: string): { nextSteps: string[] } {
  switch (statut) {
    case 'received':
      return { nextSteps: ['under_review'] };
    case 'under_review':
      return { nextSteps: ['in_progress'] };
    case 'in_progress':
      return { nextSteps: ['shortlisted', 'application_declined'] };
    case 'shortlisted':
      return { nextSteps: ['rh_interview_scheduled'] };
    case 'rh_interview_scheduled':
      return { nextSteps: ['rh_interviewed'] };
    case 'rh_interviewed':
      return { nextSteps: ['pending_decision', 'technical_interview_scheduled'] };
    case 'technical_interview_scheduled':
      return { nextSteps: ['technical_interviewed'] };
    case 'technical_interviewed':
      return { nextSteps: ['pending_decision', 'application_declined'] };
    case 'pending_decision':
      return { nextSteps: ['application_accepted', 'application_declined'] };
    case 'application_accepted':
      return { nextSteps: ['offer_sended'] };
    case 'offer_sended':
      return { nextSteps: ['offer_accepted', 'offer_declined'] };
    case 'offer_accepted':
      return { nextSteps: ['hired'] };
    default:
      return { nextSteps: [] }; // Default case
  }
}

setNextStep(applicationId: string): void {
  this.applicationsService.nextStep(applicationId).subscribe(
    (response: any) => {
      this.toaster.success('Next step set successfully');
      this.getApplications();
    },
    (error: any) => {
      this.toaster.error('An error occurred while setting the next step');
    }
  );
}




  
}
