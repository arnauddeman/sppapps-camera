import { RxOperation } from '@sppapps-rx';

export interface CameraState {
  manageOperation: RxOperation | null;
  snapOperation: RxOperation | null;
}


export const initialCameraState: CameraState = {
  manageOperation: null,
  snapOperation: null,
};
