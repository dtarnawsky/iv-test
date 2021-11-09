import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public authenticationChange$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService, private vaultService: VaultService) {
    this.authenticationChange$ = authenticationService.authenticationChange$;

  }

  ngOnInit() {

  }

  async login(): Promise<void> {
    // This line is required if iosWebView is shared and we are using Identity Vault. It prevents the privacy screen from displaying
    // Device.setHideScreenOnBackground(false);
    await this.authenticationService.login();
  }

  async logout(): Promise<void> {
    this.authenticationService.logout();
  }

  async refresh() {
    console.log(await this.authenticationService.isRefreshTokenAvailable());
    const token = await this.authenticationService.getAccessToken();
    console.log(token);
    await this.authenticationService.refreshSession();
    const atoken = await this.authenticationService.getAccessToken();
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

  async getData() {
    await this.vaultService.getData();
  }

  async checkBio() {
    const hasBio = await this.vaultService.hasBiometrics();
    alert('Biometrics is ' + hasBio);
  }

  async useSecure(enabled: boolean) {
    this.vaultService.useSecure(enabled);
  }

}
