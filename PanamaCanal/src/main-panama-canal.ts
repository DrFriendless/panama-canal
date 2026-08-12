import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PanamaCanalComponent } from './app/panama-canal.component';

bootstrapApplication(PanamaCanalComponent, appConfig)
  .catch((err) => console.error(err));
