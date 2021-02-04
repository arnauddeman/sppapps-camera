import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoggerModule } from '@sppapps-logging';
import { ModalSnapComponent, ModalSnapModule } from './modal-snap';
import { cameraReducers } from './redux';
import { CameraService } from './shared';
import { SnapComponent, SnapModule } from './snap';
import { SnapControlComponent, SnapControlModule } from './snap-control';
import { CaptureGalleryComponent, CaptureGalleryModule } from './capture-gallery';
import { SnapLauncherComponent, SnapLauncherModule } from './snap-launcher';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('camera', cameraReducers),
        SnapModule,
        SnapControlModule,
        ModalSnapModule,
        SnapLauncherModule,
        CaptureGalleryModule
    ],
    exports: [
        SnapComponent,
        SnapControlComponent,
        ModalSnapComponent,
        SnapLauncherComponent,
        CaptureGalleryComponent
    ]
})
export class CameraModule {
    static component = ModalSnapComponent;
    constructor() {
        LoggerModule.configureLoggingConsoleDebug(
            'cameraReducers',
            CameraService
        );
    }
}
