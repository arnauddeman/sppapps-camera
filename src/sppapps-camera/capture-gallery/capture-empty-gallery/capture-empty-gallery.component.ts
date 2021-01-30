import { Component, Input } from '@angular/core';
import { CAMERA_I18N_BUNDLE } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';

@Component({
  selector: 'sppapps-capture-empty-gallery',
  templateUrl: './capture-empty-gallery.component.html',
  styleUrls: ['./capture-empty-gallery.component.scss']
})
export class CaptureEmptyGalleryComponent extends SComp {

  @Input() render = false;
  @Input() message = 'camera_empty_gallery_message';

  constructor(i18nService: I18NService,
    loggingService: LoggingService) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }
}



