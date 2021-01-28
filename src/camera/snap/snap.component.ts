import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { WebcamImage } from 'ngx-webcam';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { getCameraManageOperation, getSnapOperation, SnapCameraAction } from '../redux';
import { CameraState } from '../redux/camera.states';

@Component({
  selector: 'sppapps-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss']
})
export class SnapComponent extends SComp implements OnInit {


  snap$ = new ReplaySubject<void>(1);
  active$: Observable<boolean>;

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

  ngOnInit(): void {

    this._manageSubscriptions(
      this._store.pipe(
        select(getSnapOperation),
        filter(operation => !!operation),
        filter(operation => operation.status === RxOperationStatus.TRIGGERED)
      ).subscribe(() => this._snap())
    );

    this.active$ = this._store.pipe(
      select(getCameraManageOperation),
      map(operation => operation?.query === RxOperationQuery.MANAGE && operation?.status === RxOperationStatus.TRIGGERED)
    );
  }

  private _snap() {
    this.logger.debug('snap');
    this.snap$.next();
  }

  public onImageCapture(webcamImage: WebcamImage): void {
    this.logger.debug('onImageCapture webcamImage', webcamImage);
    this._store.dispatch(new SnapCameraAction({
      query: RxOperationQuery.GET,
      status: RxOperationStatus.DONE,
      data: webcamImage.imageAsDataUrl
    }));
    // this.webcamImage = webcamImage;
  }



}
