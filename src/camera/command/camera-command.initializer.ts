import { CommandInitializer, CommandInitializerDefinition } from '@sppapps-command';
import { CAMERA_COMMANDS } from '@sppapps-camera-shared';
import { LoggingService, LogRecorder } from '@sppapps-logging';
import { ManageCameraAction, SnapCameraAction } from '../redux';


export class CameraCommandInitializer extends LogRecorder implements CommandInitializerDefinition {
  constructor(loggingService: LoggingService,
    private _commandInitializer: CommandInitializer) {
    super(loggingService);
  }

  initializeHandlers(): void {
    this.logger.debug('initializeHandlers');

    this._commandInitializer.initHandlerWithFactory(
      CAMERA_COMMANDS.camera_launch,
      () => new ManageCameraAction()
    );
    this._commandInitializer.initHandlerWithFactory(
      CAMERA_COMMANDS.camera_snap,
      () => new SnapCameraAction()
    );
  }
}
