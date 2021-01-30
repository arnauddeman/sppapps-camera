import { Injectable } from '@angular/core';
import { AuthCoreService } from '@sppapps-auth';
import { LoggingService } from '@sppapps-logging';
import { SServ } from '@sppapps-service';

@Injectable({
  providedIn: 'root',
})
export class CameraService extends SServ {

  constructor(loggingService: LoggingService,
    authCoreService: AuthCoreService) {
    super(loggingService);
  }

}

