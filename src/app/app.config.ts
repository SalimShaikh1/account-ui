import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './services/authInterceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  provideHttpClient(
    withInterceptors([authInterceptorFn]) // if using functional interceptor
  ),
  provideAnimations(),          // required by ngx-toastr
  provideToastr({               // optional global config
    positionClass: 'toast-top-right',
    timeOut: 3000,
    closeButton: true,
    progressBar: true,
  })
  ]
};
