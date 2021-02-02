import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getLogger as _getLogger } from '@sppapps-logging';
import {
  CameraAction, CameraActionTypes, isCameraAction,
  ManageCameraAction, ReadyCameraAction, ResetCameraAction,
  SelectSnapCameraAction,
  SnapCameraAction
} from './camera.actions';
import { CameraState, initialCameraState } from './camera.states';

const getLogger = () => _getLogger('cameraReducers');

export const getCameraStateFeature = createFeatureSelector<CameraState>('camera');

export const getCameraManageOperation = createSelector(
  getCameraStateFeature,
  state => state.manageOperation
);

export const getCameraResetOperation = createSelector(
  getCameraStateFeature,
  state => state.resetOperation
);

export const getSnapOperation = createSelector(
  getCameraStateFeature,
  state => state.snapOperation
);

export const getSelectedSnap = createSelector(
  getCameraStateFeature,
  state => state.selectedSnap
);

export const getCameraReady = createSelector(
  getCameraStateFeature,
  state => state.ready
);

export function cameraReducers(state = initialCameraState, action: CameraAction): CameraState {

  if (!isCameraAction(action)) {
    return state;
  }
  getLogger().debug('cameraReducers', action);

  switch (action.type) {
    case CameraActionTypes.MANAGE: {
      return {
        ...state,
        manageOperation: (<ManageCameraAction>action).payload
      };
    }

    case CameraActionTypes.RESET: {
      return {
        ...state,
        resetOperation: (<ResetCameraAction>action).payload
      };
    }

    case CameraActionTypes.SNAP: {
      return {
        ...state,
        snapOperation: (<SnapCameraAction>action).payload
      };
    }

    case CameraActionTypes.SELECT: {
      return {
        ...state,
        selectedSnap: (<SelectSnapCameraAction>action).payload
      };
    }

    case CameraActionTypes.UNSELECT: {
      return {
        ...state,
        selectedSnap: null
      };
    }

    case CameraActionTypes.READY: {
      return {
        ...state,
        ready: (<ReadyCameraAction>action).payload
      };
    }

    default: {
      return state;
    }
  }
}

