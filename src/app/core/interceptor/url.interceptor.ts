import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
import { APP_CONFIG } from '../../app.config';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let url = req.url;
  let headers = req.headers;
  let loginService = inject(LoginService);
  let toastrService = inject(ToastrService);
  let router = inject(Router);
  let appConfig: any = inject(APP_CONFIG);

  if (!url.startsWith('/assets/')) {
    url = appConfig.serverURL + url;
    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
  }
  let newReq = req.clone({
    url,
    headers,
  });
  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.url != appConfig.serverURL + '/login' &&
        error.status == 403
      ) {
        // login/signup işlemi yapılmıyor ve token hatası döndü ise tekrar giriş yapmayı dene
        return loginService.relogin().pipe(
          switchMap((token: any) => {
            toastrService.info('Tekrar giriş yapıldı');
            headers = headers.set(
              'Authorization',
              'Bearer ' + localStorage.getItem('token')
            );
            newReq = newReq.clone({
              headers,
            });
            return next(newReq);
          }),
          catchError((error) => {
            toastrService.error('Tekrar giriolduş başarısız ');
            loginService.logout();
            router.navigateByUrl('/');
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
