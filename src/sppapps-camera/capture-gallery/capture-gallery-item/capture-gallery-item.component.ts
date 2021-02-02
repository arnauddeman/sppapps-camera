import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CAMERA_I18N_BUNDLE, Capture } from '@sppapps-camera-shared';
import { SComp } from '@sppapps-component';
import { I18NService } from '@sppapps-i18n';
import { LoggingService } from '@sppapps-logging';
import { UnselectSelectionAction } from '@sppapps-selection-manager';

@Component({
  selector: 'sppapps-capture-gallery-item',
  templateUrl: './capture-gallery-item.component.html',
  styleUrls: ['./capture-gallery-item.component.scss']
})
export class CaptureGalleryItemComponent extends SComp implements OnDestroy {

  @Input() capture: Capture;
  selected = false;
  private _imgElement: ElementRef;
  loaded = false;


  constructor(i18nService: I18NService,
    loggingService: LoggingService,
    private _store: Store<any>) {
    super(i18nService, loggingService, CAMERA_I18N_BUNDLE);
  }

  ngOnDestroy(): void {
    this.logger.debug('ngOnDestroy');
    if (this.selected) {
      this._store.dispatch(new UnselectSelectionAction({
        group: this.settings.selection.groups.captures,
        item: this.capture
      }));
    }
    super.ngOnDestroy();
  }

  onSelectionChange(selected: boolean) {
    this.selected = selected;
  }

  onImageLoaded() {
    this.logger.debug('Image loaded');
    this.loaded = true;
  }

  @ViewChild('imgElement', { read: ElementRef, static: false })
  set searchimgElement(elRef: ElementRef) {
    this._imgElement = elRef;
    this.logger.debug('setImgElement', this._imgElement);
  }


}



