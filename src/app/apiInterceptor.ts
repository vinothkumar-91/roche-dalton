import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';



@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private gv: GlobalVariablesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.gv.getdefaultToken();
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: ` ${token}`}
            });
        }else{
            request = request.clone({
                setHeaders: { Authorization: `Authorization` }
            });
        }

        return next.handle(request);
    }
}