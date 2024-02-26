import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesComponent } from '../../../shared/data-tables/data-tables.component';
import { User } from '../../../core/interfaces/user';
import { UsersService } from '../../../core/services/users.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EntreprisesService } from '../../../core/services/entreprises.service';
import { Entreprise } from '../../../core/interfaces/entreprise';
import { toSignal } from '@angular/core/rxjs-interop';
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
import { PiechartComponent } from '../../../shared/piechart/piechart.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.scss',
    imports: [DataTablesComponent, RouterLink, CommonModule, TimeAgoPipe, PiechartComponent, NgxPaginationModule]
})
export class ListingComponent {

  usersService = inject(UsersService);
  toaster = inject(ToastrService);
  currentPage : number = 1;
  usersPerPage : number = 10;
  totalUsersCount : number = 0;
  totalPages : number = 0;
  adminsList: any = [];
  getusers(){
    this.usersService.getUsersByRolePaginated("admin",this.currentPage, this.usersPerPage)
      .subscribe((response: any) => {
        this.adminsList = response.users;
        this.totalUsersCount = response.totalUsersCount;
        this.totalPages = Math.ceil(this.totalUsersCount / this.usersPerPage);
      });
  } 
  ngOnInit(): void {
    this.getusers();
  }
  pageChangeEvent(event: number){
    this.currentPage = event;
    this.getusers();
  }

  deleteAdmin(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      (response) => {
        this.toaster.success('Admin deleted successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error deleting admin');
      }
    );
  }
  activateAdmin(id: number): void {
    this.usersService.activateUser(id).subscribe(
      (response) => {
        this.toaster.success('Admin activated successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error activating admin');
      }
    );
  }
  deactivateAdmin(id: number): void {
    this.usersService.deactivateUser(id).subscribe(
      (response) => {
        this.toaster.success('Admin deactivated successfully');
        this.getusers();
      },
      (error) => {
        this.toaster.error('Error deactivating admin');
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
  toggleVerificationStatus(admin: any): void {
    admin.verified = !admin.verified;
  }
  
  

  
}


