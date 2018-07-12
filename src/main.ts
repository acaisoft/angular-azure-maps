import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AmModule } from './azure-map/am.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AmModule)
  .catch(err => console.log(err));
