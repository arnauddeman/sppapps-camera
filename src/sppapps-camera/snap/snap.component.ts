import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { toScalar } from '@sppapps-helpers-shared';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { StopPendingAction } from '@sppapps-pending';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { getSelectionGroup } from '@sppapps-selection-manager';
import { Dimensions2D } from '@sppapps-uix-shared';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  getCameraManageOperation, getCameraReady, getSnapOperation,
  ReadyCameraAction, SnapCameraAction
} from '../redux';
import { CameraState } from '../redux/camera.states';

@Component({
  selector: 'sppapps-snap',
  templateUrl: './snap.component.html',
  styleUrls: ['./snap.component.scss']
})
export class SnapComponent extends SComp implements OnInit, OnDestroy {

  private _trigger = new Subject<void>();
  private _width: number;
  private _height: number;
  active$: Observable<boolean>;
  ready$: Observable<boolean>;
  okDisabled$: Observable<boolean>;

  private _size: Dimensions2D;
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();




  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

  ngOnInit(): void {
    this.logger.debug('ngOnInit size', this.size);
    this.active$ = this._store.pipe(
      select(getCameraManageOperation),
      map(operation => operation?.query === RxOperationQuery.MANAGE && operation?.status === RxOperationStatus.TRIGGERED)
    );
    this.ready$ = this._store.pipe(
      select(getCameraReady),
    );

    this.okDisabled$ = this._store.pipe(
      select(getSelectionGroup(this.settings.selection.groups.captures)),
      tap(selectionGroup => this.logger.debug('selectionGroup', selectionGroup)),
      map(selectionGroup => Object.values(selectionGroup?.items || {})),
      map(selected => toScalar(selected)),
      tap(selected => this.logger.debug('selected', selected)),
      map(selected => !selected)
    );



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

  get width(): number {
    if (this._width == null) {
      this.logger.debug('get width size', this.size);
      this._width = this.size?.w || this.settings.capture.defaultWidth;
    }
    return this._width;
  }

  get height(): number {
    if (this._height == null) {
      this._height = this.size?.h || this.settings.capture.defaultHeight;
    }
    return this._height;
  }

  @Input()
  set size(size: Dimensions2D) {
    this.logger.debug('set size', size);
    this._size = size;
    this._width = this.size?.w || this.settings.capture.defaultWidth;
    this._height = this.size?.h || this.settings.capture.defaultHeight;
  }

  get size(): Dimensions2D {
    return this._size;
  }
}
