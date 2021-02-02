import { Capture } from '@sppapps-camera-shared';
import { RxOperation } from '@sppapps-rx';

export interface CameraState {
  manageOperation: RxOperation | null;
  resetOperation: RxOperation | null;
  snapOperation: RxOperation | null;
  selectedSnap: Capture | null;
  ready: boolean;
}


export const initialCameraState: CameraState = {
  manageOperation: null,
  resetOperation: null,
  snapOperation: null,
  selectedSnap: null,
  ready: false,
};
