import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { FlexModule } from '@sppapps-uix';
import { WebcamModule } from 'ngx-webcam';
import { CancelModule, OkModule } from '@sppapps-form';
import { CaptureGalleryModule } from '../capture-gallery';
import { SnapControlModule } from '../snap-control';
import { SnapComponent } from './snap.component';
import { HelpersModule } from '@sppapps-helpers';

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
        CaptureGalleryModule,
        OkModule,
        CancelModule,
        HelpersModule
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
