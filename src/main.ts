import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronForward, personCircleOutline, personOutline, keyOutline, trashOutline, menu, logOutOutline, addOutline  } from 'ionicons/icons';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'hammerjs';
import { register } from 'swiper/element';

// Register only icons will be used
addIcons({
  chevronForward,
  personCircleOutline,
  personOutline, 
  keyOutline, 
  trashOutline,
  arrowBackOutline,
  menu,
  logOutOutline,
  addOutline,
});

register();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    provideAnimations(),
  ],
});
