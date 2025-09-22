import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isAuthenticated = !!localStorage.getItem('jwt_token'); // or use AuthService
    if (isAuthenticated) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
