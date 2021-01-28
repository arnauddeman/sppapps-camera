import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { CommandModule } from '@sppapps-command';
import { SnapControlComponent } from './snap-control.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        SnapControlComponent
    ],
    imports: [
        CommonModule,
        I18NModule,
        CommandModule,
        MatTooltipModule

    ],
    exports: [
        SnapControlComponent
    ]
})
export class SnapControlModule {
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            SnapControlComponent
        );
    }
}
