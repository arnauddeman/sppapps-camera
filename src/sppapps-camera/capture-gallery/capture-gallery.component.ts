import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE, Capture } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { SelectSelectionAction } from '../../../../sppapps-selection-manager/src/sppapps-selection-manager/redux';
import { getCameraResetOperation, getSnapOperation, ResetCameraAction, SnapCameraAction, UnselectSnapCameraAction } from '../redux';
import { CameraState } from '../redux/camera.states';

@Component({
  selector: 'sppapps-capture-gallery',
  templateUrl: './capture-gallery.component.html',
  styleUrls: ['./capture-gallery.component.scss']
})
export class CaptureGalleryComponent extends SComp implements OnInit {

  @Input() size = 4;
  @Input() render = false;

  snap$ = new ReplaySubject<void>(1);
  captures: Capture[] = [];
  maxWidth: number;

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

  ngOnInit(): void {

    this.maxWidth = this.size ? 100 / this.size : 100;
    this._store.dispatch(new UnselectSnapCameraAction());
    this._manageSubscriptions(
      this._store.pipe(
        select(getSnapOperation),
        filter(operation => !!operation),
        tap(op => this.logger.debug('tap#1 op', op)),
        filter(operation => operation.status === RxOperationStatus.DONE),
        tap(op => this.logger.debug('tap#2 op', op)),
        filter(operation => !!operation.data)
      ).subscribe(operation => {
        this._store.dispatch(new SnapCameraAction({
          query: operation.query,
          status: RxOperationStatus.COMPLETED
        }));
        this._addCapture(operation.data);
      }),
      this._store.pipe(
        select(getCameraResetOperation),
        filter(operation => !!operation),
        tap(op => this.logger.debug('getCaperaResetOperation tap#1 op', op)),
        filter(operation => operation.query === RxOperationQuery.RESET && operation.status === RxOperationStatus.TRIGGERED),
      ).subscribe(operation => {
        this.logger.debug('getCaperaResetOperation Reseting');
        this.captures = [];
        this._store.dispatch(new ResetCameraAction({
          ...operation,
          status: RxOperationStatus.PROCESSED
        }));
      })
    );
  }

  private _addCapture(data: string) {
    this.logger.debug('_addCapture data', data);
    this.logger.debug('_addCapture typeof  data', typeof data);
    const order = this.captures.length ? +this.captures[this.captures.length - 1]._id + 1 : 0;
    const newCapture: Capture = {
      _id: String(order),
      data: data
    };
    const updatedCaptures = [...this.captures];
    if (updatedCaptures.length >= this.size) {
      updatedCaptures.splice(0, 1);
    }
    updatedCaptures.push(newCapture);
    if (updatedCaptures.length === 1) {
      this._store.dispatch(
        new SelectSelectionAction({
          group: this.settings.selection.groups.captures,
          item: newCapture
        })
      );
    }
    this.captures = updatedCaptures;
  }

  get empty(): boolean {
    return !this.captures?.length;
  }

  trackCapture(index: number, capture: Capture) {
    return capture?._id;
  }
}
