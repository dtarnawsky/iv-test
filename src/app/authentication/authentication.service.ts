import { Injectable, NgZone } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { nativeIonicAuthOptions, webIonicAuthOptions } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends IonicAuth {
  public authenticationChange$: Observable<boolean>;
  private authenticationChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(platform: Platform, private ngZone: NgZone) {
    super(platform.is('hybrid') ? nativeIonicAuthOptions : webIonicAuthOptions);
    this.authenticationChange$ = this.authenticationChange.asObservable();
    this.isAuthenticated().then((authenticated) => { this.onAuthChange(authenticated); });
  }

  public async onLoginSuccess(): Promise<void> {
    this.onAuthChange(true);
  }

  public async onLogout(): Promise<void> {
    this.onAuthChange(false);
  }

  private async onAuthChange(isAuthenticated: boolean): Promise<void> {
    this.ngZone.run(() => {
      this.authenticationChange.next(isAuthenticated);
    });
  }
}
