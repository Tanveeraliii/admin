import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate  {
  constructor(private api: ApiService,private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    const validUser = localStorage?.getItem('user');
    if (validUser) {
      this.api.validateUser('/check', validUser).subscribe((res: any) => {
        if (res)
          return true;
        else
          this.router.navigate(['/login']);
        return false;
      })
    } else {
      this.router.navigate(['/login']);
      return false
    }
  };
};
