import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(HttpService)
    let tokenized = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenized)
  }

}
