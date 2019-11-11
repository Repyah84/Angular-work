import { ErrorHandler, Injectable } from "@angular/core";

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://eb98e86db46e43d6b408568bb2ccc0ea@sentry.io/1815557"
});

@Injectable({providedIn: 'root'})
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}
