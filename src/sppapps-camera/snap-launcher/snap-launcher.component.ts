import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { Dimensions2D } from '@sppapps-uix-shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getCameraManageOperation } from '../redux';
import { CameraState } from '../redux/camera.states';

@Component({
  selector: 'sppapps-snap-launcher',
  templateUrl: './snap-launcher.component.html',
  styleUrls: ['./snap-launcher.component.scss']
})
export class SnapLauncherComponent extends SComp implements OnInit {
  @Input() disabled = false;
  @Input() iconCommonClass = 'sppapps';
  @Input() iconSizeClass = 'sppapps-m';
  @Input() iconClass = 'sppapps-camera';
  @Input() tooltip = 'edit_image';
  @Input() src: string;
  active$: Observable<boolean>;
  @Input() dimensions: Dimensions2D;

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);

  }
  ngOnInit(): void {
    this.active$ = this._store.pipe(
      select(getCameraManageOperation),
      map(operation => operation?.query === RxOperationQuery.MANAGE && operation?.status === RxOperationStatus.TRIGGERED)
    );
  }
}
