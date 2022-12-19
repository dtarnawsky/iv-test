import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public isEmpty: string;
  public isLocked: string;
  public authenticationChange$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService, private vaultService: VaultService, private platform: Platform) {
    this.authenticationChange$ = authenticationService.authenticationChange$;
    this.platform.resume.subscribe(async () => {
      await this.update();
    });

  }

  async ionViewDidEnter() {
    this.update();
  }

  async update() {
    this.isEmpty = await this.vaultService.isEmpty() ? 'Vault is empty': 'Vault has data';
    this.isLocked = await this.vaultService.isLocked() ? 'Vault is locked': 'Vault is unlocked';

  }

  async login(): Promise<void> {
    // This line is required if iosWebView is shared and we are using Identity Vault. It prevents the privacy screen from displaying
    // Device.setHideScreenOnBackground(false);
    await this.authenticationService.login();
  }

  async logout(): Promise<void> {
    try {
      this.authenticationService.logout();
    } catch (err) {
      console.error(err);
    }
  }


  async refresh() {
    console.log(await this.authenticationService.isRefreshTokenAvailable());
    const token = await this.authenticationService.getAccessToken();
    console.log(token);
    await this.authenticationService.refreshSession();
    const atoken = await this.authenticationService.getAccessToken();
    console.log(atoken);
    if (atoken !== token) {
      alert('Token was refreshed');
    }
  }

  async lock() {
    if (await this.vaultService.lock()) {
      const isLocked = await this.vaultService.isLocked();
      if (!isLocked) {
        this.vaultService.presentAlert('Error','Vault lock call was successfully made but is returning locked is false');
      }
    }
    await this.update();
  }

  async unlock() {
    await this.vaultService.unlock();
    await this.update();
  }

  async checkIsEmpty() {
    const isEmpty = await this.vaultService.isEmpty();
    this.vaultService.presentAlert('Message', `isEmpty is ${isEmpty}"`);
  }

  async clear() {
    await this.vaultService.clear();
    await this.update();
  }

  async setData() {
    await this.vaultService.setData();
    await this.update();
  }

  async getData() {
    try {
      const data = await this.vaultService.getData();
      this.vaultService.presentAlert('Message', `The vault data read as "${data}"`);
    } catch (err) {
      this.vaultService.presentAlert('Error', `Failed to get data "${err.message}" (Error Code: ${err.code})`);
      await this.update();
    }
  }

  async checkBio() {
    const hasBio = await this.vaultService.hasBiometrics();
    alert('Biometrics is ' + hasBio);
  }

  async useSecure(enabled: boolean) {
    this.vaultService.useSecure(enabled);
  }

  async setToPasscode() {
    this.vaultService.switchPasscode();
  }

  async setToBoth() {
    this.vaultService.switchBoth();
  }

}
