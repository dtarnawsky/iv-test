import { Component } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public authenticationChange$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService, private vaultService: VaultService) {
    this.authenticationChange$ = authenticationService.authenticationChange$;
  }

  async login(): Promise<void> {
    Device.setHideScreenOnBackground(false);
    this.authenticationService.login();
  }

  async logout(): Promise<void> {
    this.authenticationService.logout();
  }

  async refresh() {
    console.log(await this.authenticationService.isRefreshTokenAvailable());
    const token = this.authenticationService.getAccessToken();
    console.log(token);
    await this.authenticationService.refreshSession();
    const atoken = this.authenticationService.getAccessToken();
    console.log(atoken);
    if (atoken != token) {      
      alert('Token was refreshed')
    }    
  }

  async lock() {
    await this.vaultService.lock();
  }

  async unlock() {
    await this.vaultService.unlock();
  }

  async clear() {
    await this.vaultService.clear();
  }

  async setData() {
    await this.vaultService.setData();
  }

  async checkBio() {
    const hasBio = await this.vaultService.hasBiometrics();
    alert('Biometrics is '+hasBio);
  }

}
