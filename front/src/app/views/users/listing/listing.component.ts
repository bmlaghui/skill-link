import { Component, Input, computed, inject } from '@angular/core';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.scss',
    imports: [DataTablesComponent, RouterLink, CommonModule, TimeAgoPipe, NgxPaginationModule]
})
export class ListingComponent {
  usersService = inject(UsersService);
  toaster = inject(ToastrService);
  currentPage : number = 1;
  usersPerPage : number = 10;
  totalusersCount : number = 0;
  totalPages : number = 0;
  candidatesList: any = [];
  getusers(){
    this.usersService.getUsersByRolePaginated("candidat",this.currentPage, this.usersPerPage)
      .subscribe((response: any) => {
        this.candidatesList = response.users;
        this.totalusersCount = response.totalusersCount;
        this.totalPages = Math.ceil(this.totalusersCount / this.usersPerPage);
      });
  } 
  ngOnInit(): void {
    this.getusers();
  }
  pageChangeEvent(event: number){
    this.currentPage = event;
    this.getusers();
  }

  deleteCandidate(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      (response) => {
        this.toaster.success('Candidate deleted successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error deleting Candidate');
      }
    );
  }
  activateCandidate(id: number): void {
    this.usersService.activateUser(id).subscribe(
      (response) => {
        this.toaster.success('Candidate activated successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error activating Candidate');
      }
    );
  }
  deactivateCandidate(id: number): void {
    this.usersService.deactivateUser(id).subscribe(
      (response) => {
        this.toaster.success('Candidate deactivated successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error deactivating Candidate');
      }
    );
  }
  actualUser = toSignal(inject(AuthService).connectedUser(), { initialValue: {
    "languages": [],
    "interests": [],
    "firstName": null,
    "lastName": null,
    "email": null,
    "userName": null,
    "phoneNumber": null,
    "role": null,
    "address": null,
    "description": null,
    "linkLinkedin": null,
    "linkGithub": null,
    "linkWebsite": null,
    "linkCV": null,
    "image": null,
    "skills": [],
    "verified": null,
    "notifications": [],
    "experiences": [],
    "diplomas": [],
    "missions": [],
    "applications": [],
    "createdAt": null,
    "updatedAt": null
  }  });
  toggleVerificationStatus(Candidate: any): void {
    Candidate.verified = !Candidate.verified;
  }
}
