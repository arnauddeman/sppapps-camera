import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommandModule } from '@sppapps-command';
import { I18NModule } from '@sppapps-i18n';
import { LoggerModule } from '@sppapps-logging';
import { SnapLauncherComponent } from './snap-launcher.component';

@NgModule({
    declarations: [
        SnapLauncherComponent
    ],
    imports: [
        CommonModule,
        I18NModule,
        MatTooltipModule,
        CommandModule
    ],
    exports: [
        SnapLauncherComponent
    ]
})
export class SnapLauncherModule {
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            SnapLauncherComponent
        );
    }
}
