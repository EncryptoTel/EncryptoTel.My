import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

declare let ga: Function;

@Injectable()
export class AnalyticsServices {
  public emitEvent = (eventCategory: string,
                      eventAction: string,
                      eventLabel: string = null,
                      eventValue: number = null) => {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
    if (!environment.production) {
      console.log('Event send: \n', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  };
  public sendPageView = (route: string) => {
    ga('send', 'pageview', route);
    if (!environment.production) {
      console.log(`Route '${route}' send!`);
    }
  }
}
