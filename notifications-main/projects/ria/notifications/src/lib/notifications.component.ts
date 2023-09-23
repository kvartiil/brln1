import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalNotification } from './notifications.model'
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const CLOSED_NOTIFICATIONS_KEY = 'GLOBAL_CLOSED_NOTIFICATIONS';

@Component({
  selector: 'lib-stateportal-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit{
  @Input()
  set language(lang: string) {
    this.lang$.next(lang);
  }

  @Input() apiGwUrl: string;
  @Input() notifyEnabled: boolean;

  private lang$ = new BehaviorSubject<string>('et');
  notifications: GlobalNotification[] = [];
  filteredNotifications$ = new BehaviorSubject<GlobalNotification[]>([]);

  constructor(
    private notificationService: NotificationsService,
    @Inject(PLATFORM_ID) private platformId: Record<string, any>
  ) {
  }

  ngOnInit(): void {
    const notifications$ = this.lang$.pipe(
      switchMap(lang => {
        return this.notificationService.getNotifications(lang, this.notifyEnabled, this.apiGwUrl);
      }))

    notifications$.subscribe(it => it.filter(sa => {
        if (!isPlatformBrowser(this.platformId)) {
          return true;
        }
        const savedClosedItems = JSON.parse(sessionStorage.getItem(CLOSED_NOTIFICATIONS_KEY));
        const closedItems = savedClosedItems instanceof Array ? savedClosedItems : [];
        return !closedItems.includes(sa.uuid);
      })
        .forEach(sa => {
          this.notifications = this.notifications
            .filter(nt => nt.uuid !== sa.uuid && (!nt.lang || nt.lang === this.lang$.getValue()));
          this.notifications.push(sa);
          this.filteredNotifications$.next(this.notifications);
        })
    );
  }


  close(uuid: string): void {
    this.notifications = this.notifications.filter(it => it.uuid !== uuid);
    this.filteredNotifications$.next(this.notifications);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const savedClosedItems = JSON.parse(sessionStorage.getItem(CLOSED_NOTIFICATIONS_KEY));
    const closedItems = savedClosedItems instanceof Array ? savedClosedItems : [];
    closedItems.push(uuid);
    sessionStorage.setItem(CLOSED_NOTIFICATIONS_KEY, JSON.stringify(closedItems));
  }
}
