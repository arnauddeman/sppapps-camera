import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE, Capture } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { CameraState } from '../../redux/camera.states';

@Component({
  selector: 'sppapps-capture-gallery-item',
  templateUrl: './capture-gallery-item.component.html',
  styleUrls: ['./capture-gallery-item.component.scss']
})
export class CaptureGalleryItemComponent extends SComp {

  @Input() capture: Capture;

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

}

