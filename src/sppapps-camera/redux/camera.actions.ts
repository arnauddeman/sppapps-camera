import { Action } from '@ngrx/store';
import {
  formatAction, OPERATIONS, RX_TRIGGER_GET,
  RX_TRIGGER_MANAGE, RX_TRIGGER_RESET, STATUS,
  RxOperation
} from '@sppapps-rx';
import { Capture } from '../../../shared/sppapps-camera-shared/src/models';

const PREFIX = 'SPPAPPS-CAMERA';
const SNAP_OPERATION = 'SNAP';
export const CameraActionTypes = {
  MANAGE: formatAction(PREFIX, OPERATIONS.MANAGE),
  RESET: formatAction(PREFIX, OPERATIONS.RESET),
  READY: formatAction(PREFIX, OPERATIONS.INITIALIZE, STATUS.DONE),
  SNAP: formatAction(PREFIX, SNAP_OPERATION),
  SELECT: formatAction(PREFIX, OPERATIONS.SELECT),
  UNSELECT: formatAction(PREFIX, OPERATIONS.UNSELECT),
};

const types = {};
Object.values(CameraActionTypes).forEach(type => types[type] = true);
export function isCameraAction(action: Action): boolean {
  return types[action.type];
}

export class ManageCameraAction implements Action {
  type = CameraActionTypes.MANAGE;
  constructor(public payload = RX_TRIGGER_MANAGE) { }
}

export class ResetCameraAction implements Action {
  type = CameraActionTypes.RESET;
  constructor(public payload = RX_TRIGGER_RESET) { }
}

export class SnapCameraAction implements Action {
  type = CameraActionTypes.SNAP;
  constructor(public payload = RX_TRIGGER_GET) { }
}

export class SelectSnapCameraAction implements Action {
  type = CameraActionTypes.SELECT;
  constructor(public payload: Capture) { }
}


export class UnselectSnapCameraAction implements Action {
  type = CameraActionTypes.UNSELECT;
}


export class ReadyCameraAction implements Action {
  type = CameraActionTypes.READY;
  constructor(public payload = true) { }
}

export type CameraAction =
  | ManageCameraAction
  | ResetCameraAction
  | SnapCameraAction
  | ReadyCameraAction
  | SelectSnapCameraAction
  | UnselectSnapCameraAction
  ;
