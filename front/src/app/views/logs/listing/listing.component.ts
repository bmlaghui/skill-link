import { Component, OnInit, computed, inject } from '@angular/core';
import { LogService } from '../../../core/services/log.service'; // Add this line
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-listing',
    standalone: true,
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    imports: [CommonModule, TimeAgoPipe, NgxPaginationModule]
})
export class ListingComponent {
  
  logsService = inject(LogService);
  toaster = inject(ToastrService);
  currentPage : number = 1;
  logsPerPage : number = 10;
  totalLogsCount : number = 0;
  totalPages : number = 0;
  logs: any = [];
  getLogs(){
    this.logsService.getAllLogs(this.currentPage, this.logsPerPage)
      .subscribe((response: any) => {
        this.logs = response.logs;
        this.totalLogsCount = response.totalLogsCount;
        this.totalPages = Math.ceil(this.totalLogsCount / this.logsPerPage);
      });
  } 
  ngOnInit(): void {
    this.getLogs();
  }
  pageChangeEvent(event: number){
    this.currentPage = event;
    this.getLogs();
  }
}


