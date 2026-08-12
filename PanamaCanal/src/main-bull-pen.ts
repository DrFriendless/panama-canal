import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { BullPenComponent } from './app/bull-pen.component';

bootstrapApplication(BullPenComponent, appConfig)
  .catch((err) => console.error(err));
