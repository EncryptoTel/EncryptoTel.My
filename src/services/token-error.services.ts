import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class TokenErrorServices implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  handleError(error: any): void {
    const router = this.injector.get(Router);
    console.log(error);
    if (error.rejection.status === 401 || error.rejection.status === 403) {
      router.navigate(['/sign-in']);
    }
    throw error;
  }
}
