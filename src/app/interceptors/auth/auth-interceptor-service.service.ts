import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * This provider just is executed when in local storage is session variable
 * this session variable should contain a basic_token.
 *
 */
export class AuthInterceptorServiceService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const sesionLS: null | string = localStorage.getItem('sesion');

    let request = req;
    // console.log(req)

    if (sesionLS) {
      const sesion = JSON.parse(sesionLS);
      const basicToken = sesion.basic_token;
      request = req.clone({
        setHeaders: {
          authorization: `Basic ${basicToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
