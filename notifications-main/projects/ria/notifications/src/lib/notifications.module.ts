import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { RiaComponentLibraryModule } from '@ria/ria-components-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    RiaComponentLibraryModule,
    CommonModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
