import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Your routes
import { routes } from './app.routes';

// Your interceptor
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router setup
    provideRouter(routes),

    // HttpClient with JWT interceptor
    provideHttpClient(withInterceptors([authInterceptor])),

    // Angular Material modules
    importProvidersFrom(MatCardModule, MatButtonModule)
  ]
};
