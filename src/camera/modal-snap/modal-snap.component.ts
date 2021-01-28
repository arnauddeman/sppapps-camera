import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { IMAGE_EDITION_I18N_BUNDLE } from '@sppapps-image-edition-shared';
import { LoggingService } from '@sppapps-logging';
import { ModalComponent } from '@sppapps-modal';
import { RxOperationQuery, RxOperationStatus } from '@sppapps-rx';
import { filter, tap } from 'rxjs/operators';
import { getCameraManageOperation, ManageCameraAction } from '../redux';
import { CameraState } from '../redux/camera.states';


@Component({
  selector: 'sppapps-modal-snap',
  templateUrl: './modal-snap.component.html'
})
export class ModalSnapComponent extends SComp implements OnInit {

  private _imageChanged = false;

  @ViewChild(ModalComponent, { static: true }) modalComponent: ModalComponent;

  userConfirmationRequired;

  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<CameraState>) {
    super(i18nService, loggingService, IMAGE_EDITION_I18N_BUNDLE);
  }

  ngOnInit() {


    this._manageSubscriptions(

      this._store.pipe(select(getCameraManageOperation),
        filter(operation => !!operation),
        filter(operation => operation.query === RxOperationQuery.MANAGE),

        tap(operation => this.logger.debug('ngOnInit operation', operation))
      ).subscribe((operation) => {
        if (operation.status === RxOperationStatus.TRIGGERED) {
          this.show();
        } else {
          this.hide();
        }
      }),
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

  onClose() {
    this.logger.debug('onClose 2');
    this.userConfirmationRequired = this._imageChanged;
    this.logger.debug('onClose userConfirmationRequired', this.userConfirmationRequired);
    // this.userConfirmationRequired = false; // this.preferencesManagerComponent.changed;
    if (!this.userConfirmationRequired) {
      this._store.dispatch(
        new ManageCameraAction({ query: RxOperationQuery.MANAGE, status: RxOperationStatus.DONE })
      );
    }
  }

  onUserCancelConfirmation(confirmed: boolean) {
    this.userConfirmationRequired = false;
    if (confirmed) {
      this._store.dispatch(
        new ManageCameraAction({ query: RxOperationQuery.MANAGE, status: RxOperationStatus.CANCEL })
      );

    }

  }

  // onImageChange(change: boolean) {
  //   this.logger.debug('onImageChange change', change);
  //   this._imageChanged = change;
  // }
}
