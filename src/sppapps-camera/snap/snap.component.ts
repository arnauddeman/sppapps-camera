import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { WebcamImage } from 'ngx-webcam';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';
import { StopPendingAction } from '../../../../sppapps-pending/src/sppapps-pending';
import { getCameraManageOperation, getCameraReady, getSnapOperation, ReadyCameraAction, SnapCameraAction } from '../redux';
import { CameraState } from '../redux/camera.states';

@Component({
  selector: 'sppapps-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss']
})
export class SnapComponent extends SComp implements OnInit, OnDestroy {


  private _trigger = new Subject<void>();
  // private snap$ = new ReplaySubject<void>(0);

  // snap$: Observable<any>;
  active$: Observable<boolean>;
  ready$: Observable<boolean>;

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

  ngOnInit(): void {
    this.logger.debug('OnReady');
    this.active$ = this._store.pipe(
      select(getCameraManageOperation),
      map(operation => operation?.query === RxOperationQuery.MANAGE && operation?.status === RxOperationStatus.TRIGGERED)
    );
    this.ready$ = this._store.pipe(
      select(getCameraReady),
    );
    // this.snap$ = this.snap$.pipe(
    //   tap(order => this.logger.debug('order', order)),
    //   distinctUntilChanged(),
    //   tap(() => this.logger.debug('SNAP'))
    // );

    this._manageSubscriptions(
      this._store.pipe(
        select(getSnapOperation),
        filter(operation => !!operation),
        filter(operation => operation.status === RxOperationStatus.TRIGGERED),
        tap(op => this.logger.debug('getSnapOperation', op))
      ).subscribe(() => this._snap()),
      this.active$.pipe(
        filter(active => !active)
      ).subscribe(() => this._store.dispatch(new ReadyCameraAction(false))),
      this.ready$.pipe(
        filter(ready => ready)
      ).subscribe(() => {
        this.logger.debug('ready reset of snap$');
        // this.snap$ = new ReplaySubject<void>(1);
        setTimeout(() => this._store.dispatch(new StopPendingAction()), 200);
      })
    );


  }

  ngOnDestroy(): void {
    this.logger.debug('ngOnDestroy');
    this._store.dispatch(new ReadyCameraAction(false));
    super.ngOnDestroy();
  }

  private _snap() {
    this.logger.debug('_snap');
    this._trigger.next();
  }

  public get snap$(): Observable<void> {
    return this._trigger.asObservable();
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

  onInitError(error: any) {
    this.logger.debug('onInitError error', error);
  }

  onCameraSwitched(event: any) {
    this.logger.debug('onCamearSwitched', event);
    setTimeout(() => this._store.dispatch(new ReadyCameraAction()), 400);
  }

  onOk() {
    this.logger.debug('onOk');
    this.submit.emit();
  }

  onCancel() {
    this.logger.debug('onCancel');
    this.cancel.emit();

  }
}
