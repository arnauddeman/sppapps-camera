import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE, Capture } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { toScalar } from '@sppapps-helpers-shared';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { ModalComponent } from '@sppapps-modal';
import { StartPendingAction } from '@sppapps-pending';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { getSelectionGroup } from '@sppapps-selection-manager';
import { Dimensions2D } from '@sppapps-uix-shared';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import {
  getCameraManageOperation, ManageCameraAction, ResetCameraAction,
  SelectSnapCameraAction
} from '../redux';
import { CameraState } from '../redux/camera.states';
import { CAMERA_PENDING } from '../settings';

@Component({
  selector: 'sppapps-modal-snap',
  templateUrl: './modal-snap.component.html'
})
export class ModalSnapComponent extends SComp implements OnInit {

  pendingId = CAMERA_PENDING;

  @ViewChild(ModalComponent, { static: true }) modalComponent: ModalComponent;
  selected$: Observable<Capture>;
  size: Dimensions2D;

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

  ngOnInit() {

    this._manageSubscriptions(

      this._store.pipe(select(getCameraManageOperation),
        filter(operation => !!operation),
        filter(operation => operation.query === RxOperationQuery.MANAGE),
        tap(operation => this.logger.debug('ngOnInit operation', operation))
      ).subscribe((operation) => {
        if (operation.status === RxOperationStatus.TRIGGERED) {
          this.size = operation.settings;
          this._store.dispatch(new StartPendingAction(this.pendingId));
          this.show();
        } else {
          this.hide();
        }
      }),
    );

    this.selected$ = this._store.pipe(
      select(getSelectionGroup(this.settings.selection.groups.captures)),
      tap(selectionGroup => this.logger.debug('selectionGroup', selectionGroup)),
      map(selectionGroup => Object.values(selectionGroup?.items || {})),
      map((selected: Capture[]) => toScalar(selected)),

    );
  }

  show() {
    this.logger.debug('show');
    if (this.modalComponent) {
      this.modalComponent.show();
    }
  }

  hide() {
    this.logger.debug('hide');

    if (this.modalComponent) {
      this.modalComponent.hide();
    }

  }

  onSubmit() {
    this.logger.debug('onSubmit');
    this.selected$.pipe(
      take(1),
    ).subscribe(selected => {
      this.logger.debug('selected', selected);
      this._store.dispatch(new SelectSnapCameraAction(selected));
      this._close();
    });
  }

  onClose() {
    this.logger.debug('onClose');
    this._close();
  }

  private _close() {
    this.logger.debug('_close');
    this._store.dispatch(
      new ManageCameraAction({
        query: RxOperationQuery.MANAGE,
        status: RxOperationStatus.CANCEL
      })
    );
    this._store.dispatch(new ResetCameraAction());
  }

}
