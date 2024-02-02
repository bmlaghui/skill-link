import { Injectable } from '@angular/core';
import { interval, Observable, Subscription, Subject } from 'rxjs';
import { throttle } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private idleSubject = new Subject<boolean>();
  private timeout = environment.time_out; // seconds
  private lastActivity?: Date;
  private idleCheckInterval = 10; // seconds
  private idleSubscription?: Subscription;


  constructor() { 
    this.resetTimer();
    this.startWatching();
  }

  get idleState(): Observable<boolean> {
    return this.idleSubject.asObservable();
  }

  private startWatching() {
    this.idleSubscription = interval(this.idleCheckInterval * 1000).pipe(
      throttle(() => interval(1000))
      ).subscribe(() => {
        const now = new Date();
        if (this.lastActivity && now.getTime() - this.lastActivity.getTime()! > this.timeout * 1000) {
          this.idleSubject.next(true);
        }
    });
  }

  public resetTimer() {
    this.lastActivity = new Date();
    this.idleSubject.next(false);
  }

  public stopWatching() {
    if(this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

}
