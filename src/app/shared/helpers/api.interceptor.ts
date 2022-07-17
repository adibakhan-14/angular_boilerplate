import { Injectable, Inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
// import { IContainer } from '../models/api-container.model';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject("BASE_API_URL") private baseUrl: string) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // request = request.clone({
    //   headers: request.headers.set('Authorization', 'Bearer ' + token)
    // });
    // let checkUrl = request.url.split("/");
    // if (localStorage.getItem("accessToken")) {
    //   request = request.clone({
    //     url: `${this.baseUrl}${request.url}`
    //   });
    //   request = request.clone({
    //     headers: request.headers.set(
    //       "Authorization",
    //       "Bearer " + localStorage.getItem("accessToken")
    //     )
    //   });
    // } else {
    //   request = request.clone({ url: `${this.baseUrl}${request.url}` });
    // }

    request = request.clone({ url: `${this.baseUrl}${request.url}` });
    request = request.clone({
      headers: request.headers.set("Content-Type", "application/json")
    });
    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });


    // request = request.clone({
    //   headers: request.headers.set("Content-Type", "application/json")
    // });
    // request = request.clone({
    //   headers: request.headers.set("Accept", "application/json")
    // });
    // Use for middleware
    // request = request.clone({
    //   headers: request.headers.set("appname", "Honda Connect")
    // });
    // request = request.clone({
    //   headers: request.headers.set("modulename", "HCB")
    // });
    // Use for middleware
    return next.handle(request).pipe(
      retry(0),
      // map(response => {
      //   return response.isExecuted && response.data ? response.data: null;
      // }),
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {

        //   // refresh token
        // } else {
        //   return throwError(error);
        // }
        return throwError(error);
      })
    );
  }
}
