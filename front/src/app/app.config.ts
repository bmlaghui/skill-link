import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './core/interceptors/logger.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideAnimations(), // required animations providers
      provideToastr(), // Toastr providers
      provideHttpClient(withInterceptors([loggerInterceptor])) // Http client providers
  ]
};


