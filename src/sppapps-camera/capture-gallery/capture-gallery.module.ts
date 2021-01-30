import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { SelectionManagerModule } from '@sppapps-selection-manager';
import { WebcamModule } from 'ngx-webcam';
import { CaptureEmptyGalleryComponent } from './capture-empty-gallery/capture-empty-gallery.component';
import { CaptureGalleryItemComponent } from './capture-gallery-item/capture-gallery-item.component';
import { CaptureGalleryComponent } from './capture-gallery.component';

@NgModule({
    declarations: [
        CaptureEmptyGalleryComponent,
        CaptureGalleryComponent,
        CaptureGalleryItemComponent
    ],
    imports: [
        CommonModule,
        I18NModule,
        WebcamModule,
        SelectionManagerModule
    ],
    exports: [
        CaptureGalleryComponent,
        CaptureGalleryItemComponent,
        CaptureEmptyGalleryComponent
    ]
})
export class CaptureGalleryModule {
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            CaptureGalleryComponent,
            CaptureGalleryItemComponent,
            CaptureEmptyGalleryComponent
        );
    }
}
