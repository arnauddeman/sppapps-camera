import { Component, Input } from '@angular/core';
import { CAMERA_I18N_BUNDLE } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';

@Component({
  selector: 'sppapps-snap-control',
  templateUrl: './snap-control.component.html',
  styleUrls: ['./snap-control.component.scss']
})
export class SnapControlComponent extends SComp {
  @Input() disabled = false;
  @Input() render = false;
  @Input() iconCommonClass = 'sppapps';
  @Input() iconSizeClass = 'sppapps-l';
  @Input() iconClass = 'sppapps-snap';
  tooltip = 'snap';

  constructor(i18nService: I18NService,
    loggingService: LoggingService) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }


}
