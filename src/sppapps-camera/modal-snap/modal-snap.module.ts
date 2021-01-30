import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { ModalModule } from '@sppapps-modal';
import { SnapModule } from '../snap';
import { ModalSnapComponent } from './modal-snap.component';


@NgModule({
    declarations: [
        ModalSnapComponent
    ],
    imports: [
        CommonModule,
        I18NModule,
        ModalModule,
        SnapModule
    ],
    exports: [
        ModalSnapComponent
    ]
})
export class ModalSnapModule {
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            ModalSnapComponent
        );
    }
}
