import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { LoggingService, LogRecorder } from '@sppapps-logging';
import { CameraService } from '../shared';



@Injectable()
export class CameraEffects extends LogRecorder {

  constructor(loggingService: LoggingService,
    private _actions$: Actions,
    private _cameraService: CameraService) {
    super(loggingService);
  }

  // @Effect() create$ =
  //   this._actions$.pipe(
  //     ofType(CameraActionTypes.CREATE),
  //     map((action: CreateCameraAction) => {
  //       return action.payload;
  //     }),
  //     flatMap(camera => {
  //       this.logger.debug('create$ flatMap', camera);
  //       return this._cameraService.create(camera).pipe(
  //         map(apiRes => {
  //           this.logger.debug('create$ map', apiRes);
  //           return apiRes.error ? new CRUDOperationFailureCameraAction(apiRes.error) : new CRUDOperationSuccessCameraAction(apiRes.data);
  //         }),
  //         catchError(error => {
  //           this.logger.debug('create$ failure', error);
  //           return of(new CRUDOperationFailureCameraAction(error));
  //         })
  //       )
  //     }),
  //   );
  // @Effect() update$ =
  //   this._actions$.pipe(
  //     ofType(CameraActionTypes.UPDATE),
  //     map((action: UpdateCameraAction) => {
  //       return action.payload;
  //     }),
  //     flatMap(camera => {
  //       this.logger.debug('update$ flatMap', camera);
  //       return this._cameraService.update(camera).pipe(
  //         map(apiRes => {
  //           this.logger.debug('update$ map', apiRes);
  //           return apiRes.error ? new CRUDOperationFailureCameraAction(apiRes.error) : new CRUDOperationSuccessCameraAction(apiRes.data);
  //         }),
  //         catchError(error => {
  //           this.logger.debug('update$ failure', error);
  //           return of(new CRUDOperationFailureCameraAction(error));
  //         })
  //       )
  //     }),
  //   );

  // @Effect() delete$ =
  //   this._actions$.pipe(
  //     ofType(CameraActionTypes.DELETE),
  //     map((action: DeleteCameraAction) => {
  //       return action.payload;
  //     }),
  //     flatMap(camera => {
  //       this.logger.debug('delete$ flatMap', camera);
  //       return this._cameraService.delete(camera).pipe(
  //         map(apiRes => {
  //           this.logger.debug('delete$ map', apiRes);

  //           return apiRes.error ? new CRUDOperationFailureCameraAction(apiRes.error) : new CRUDOperationSuccessCameraAction(apiRes.data);
  //         }),
  //         catchError(error => {
  //           this.logger.debug('delete$ failure', error);
  //           return of(new CRUDOperationFailureCameraAction(error));
  //         })
  //       )
  //     })
  //   );
}
