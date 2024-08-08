import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { ThemeService } from './core/services/theme.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes , withHashLocation()) , {
    provide: APP_INITIALIZER,
    useFactory: setTheme,
    multi: true
  },
  provideHttpClient() ]
};


export function setTheme() {
  const themeService = inject(ThemeService);
  return () => themeService.setCurrentThemeAtAPPInit();
}