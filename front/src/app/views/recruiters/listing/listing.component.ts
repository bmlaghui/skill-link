import { Component, inject } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
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
  recruitersList: any = [];
  getusers(){
    this.usersService.getUsersByRolePaginated("entreprise",this.currentPage, this.usersPerPage)
      .subscribe((response: any) => {
        this.recruitersList = response.users;
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

  deleteRecruiter(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      (response) => {
        this.toaster.success('Recruiter deleted successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error deleting Recruiter');
      }
    );
  }
  activateRecruiter(id: number): void {
    this.usersService.activateUser(id).subscribe(
      (response) => {
        this.toaster.success('Recruiter activated successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error activating Recruiter');
      }
    );
  }
  deactivateRecruiter(id: number): void {
    this.usersService.deactivateUser(id).subscribe(
      (response) => {
        this.toaster.success('Recruiter deactivated successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error deactivating Recruiter');
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
  toggleVerificationStatus(Recruiter: any): void {
    Recruiter.verified = !Recruiter.verified;
  }
}
