import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE, Capture } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { RxOperationStatus } from '@sppapps-rx';
import { WebcamImage } from 'ngx-webcam';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getSnapOperation } from '../redux';
import { CameraState } from '../redux/camera.states';

@Component({
  selector: 'sppapps-capture-gallery',
  templateUrl: './capture-gallery.component.html',
  styleUrls: ['./capture-gallery.component.scss']
})
export class CaptureGalleryComponent extends SComp implements OnInit {

  @Input() size = 4;
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
    this._manageSubscriptions(
      this._store.pipe(
        select(getSnapOperation),
        filter(operation => !!operation),
        filter(operation => operation.status === RxOperationStatus.DONE),
        filter(operation => !!operation.data)
      ).subscribe(operation => this._addCapture(operation.data))
    );
  }

  private _addCapture(data: string) {
    this.logger.debug('_addCapture');
    const order = this.captures.length ? +this.captures[this.captures.length - 1].order + 1 : 0;
    const newCapture: Capture = {
      order: order,
      data: data
    };
    const updatedCaptures = [...this.captures];
    if (updatedCaptures.length >= this.size) {
      updatedCaptures.splice(0, 1);
    }
    updatedCaptures.push(newCapture);
    this.captures = updatedCaptures;
  }

  trackCapture(index: number, capture: Capture) {
    return capture?.order;
  }
}
