import { Action } from '@ngrx/store';
import { formatAction, OPERATIONS, RX_TRIGGER_GET, RX_TRIGGER_MANAGE, STATUS } from '@sppapps-rx';

const PREFIX = 'SPPAPPS-CAMERA';
const SNAP_OPERATION = 'SNAP';
export const CameraActionTypes = {
  MANAGE: formatAction(PREFIX, OPERATIONS.MANAGE),
  READY: formatAction(PREFIX, OPERATIONS.INITIALIZE, STATUS.DONE),
  SNAP: formatAction(PREFIX, SNAP_OPERATION),
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

export class SnapCameraAction implements Action {
  type = CameraActionTypes.SNAP;
  constructor(public payload = RX_TRIGGER_GET) { }
}

export class ReadyCameraAction implements Action {
  type = CameraActionTypes.READY;
  constructor(public payload = true) { }
}

export type CameraAction =
  | ManageCameraAction
  | SnapCameraAction
  | ReadyCameraAction
  ;
