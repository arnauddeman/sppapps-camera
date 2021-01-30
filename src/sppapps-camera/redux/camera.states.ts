import { RxOperation } from '@sppapps-rx';

export interface CameraState {
  manageOperation: RxOperation | null;
  snapOperation: RxOperation | null;
  ready: boolean;
}


export const initialCameraState: CameraState = {
  manageOperation: null,
  snapOperation: null,
  ready: false,
};
