import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { FlexModule } from '@sppapps-uix';
import { WebcamModule } from 'ngx-webcam';
import { CaptureGalleryModule } from '../capture-gallery';
import { SnapControlModule } from '../snap-control';
import { SnapComponent } from './snap.component';

@NgModule({
    declarations: [
        SnapComponent
    ],
    imports: [
        CommonModule,
        I18NModule,
        WebcamModule,
        FlexModule,
        SnapControlModule,
        CaptureGalleryModule
    ],
    exports: [
        SnapComponent
    ]
})
export class SnapModule {
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            SnapComponent
        );
    }
}
