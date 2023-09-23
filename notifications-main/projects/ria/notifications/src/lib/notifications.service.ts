import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllHeaderNotifications, Notification } from '@notify/notify-static';
import { VeeraGlobalNotificationType } from '@ria/ria-components/dist/types/components/veera-global-notification/veera-global-notification';
import { isPlatformBrowser } from '@angular/common';
import { GlobalNotification } from './notifications.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Record<string, any>
  ) {
  }

  getNotifications(lang: string, notifyEnabled: boolean, apiGwUrl: string): Observable<GlobalNotification[]> {
    let notifyNotifications: Observable<GlobalNotification[]> = EMPTY
    if (notifyEnabled && isPlatformBrowser(this.platformId)) {
      notifyNotifications = from(getAllHeaderNotifications({eestiEeApiGwBaseUrl: apiGwUrl})).pipe(
        map(it => it.map(sa => this.toGlobalNotification(lang, sa)))
      );
    }
    return notifyNotifications
  }

  toGlobalNotification(lang: string, notifyNotification: Notification): GlobalNotification {
    return {
      uuid: notifyNotification.id,
      type: notifyNotification.messageType?.toLowerCase() as VeeraGlobalNotificationType,
      visible: notifyNotification.published,
      visibleFrom: notifyNotification.publishedFrom,
      visibleTo: notifyNotification.publishedUntil,
      content: this.getTranslatedMessage(lang, notifyNotification)
    };
  }

  private getTranslatedMessage(lang: string, notifyNotification: Notification): string {
    switch (lang) {
      case Language.EN:
        return notifyNotification.messageEng;
      case Language.RU:
        return notifyNotification.messageRus;
      case Language.ET: // Fall-through
      default:
        return notifyNotification.messageEst;
    }
  }
}

export enum Language {
  ET = 'et',
  EN = 'en',
  RU = 'ru'
}
