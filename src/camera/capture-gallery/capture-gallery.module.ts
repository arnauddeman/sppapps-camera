import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { FlexModule } from '@sppapps-uix';
import { WebcamModule } from 'ngx-webcam';
import { SnapControlModule } from '../snap-control';
import { CaptureGalleryComponent } from './capture-gallery.component';
import { CaptureGalleryItemComponent } from './capture-gallery-item/capture-gallery-item.component';

@NgModule({
    declarations: [
        CaptureGalleryComponent,
        CaptureGalleryItemComponent
    ],
    imports: [
        CommonModule,
        I18NModule,
        WebcamModule,
        FlexModule,
        SnapControlModule
    ],
    exports: [
        CaptureGalleryComponent,
        CaptureGalleryItemComponent
    ]
})
export class CaptureGalleryModule {
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            CaptureGalleryComponent,
            CaptureGalleryItemComponent
        );
    }
}
