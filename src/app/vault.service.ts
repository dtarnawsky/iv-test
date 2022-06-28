import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  BrowserVault, Device, DeviceSecurityType,
  IdentityVaultConfig, Vault, VaultType
} from '@ionic-enterprise/identity-vault';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.iv-test-bio5',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Biometrics,
    lockAfterBackgrounded: 2000,
    shouldClearVaultAfterTooManyFailedAttempts: true,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: false,
  };

  vault: Vault | BrowserVault;

  constructor(private platform: Platform, private alertController: AlertController) {
    this.init();
  }

  async init() {
    await this.platform.ready();
    this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(this.config) : new Vault(this.config);
    this.vault.onConfigChanged(() => {
      console.log('Vault configuration was changed', this.config);
    });
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError((err) => {
      console.error('Vault error', err);
      this.presentAlert('Vault Error', err.code + ': ' + err.message);
    });
    await Device.setHideScreenOnBackground(true);
  }

  async presentAlert(header: string, message: string): Promise<string> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return role;
  }

  async switchPasscode() {
    try {
      this.vault = new Vault(
        {
          key: 'io.ionic.iv-test-sysp',
          type: VaultType.SecureStorage,
          deviceSecurityType: DeviceSecurityType.None,
          lockAfterBackgrounded: 2000,
          shouldClearVaultAfterTooManyFailedAttempts: false,
          customPasscodeInvalidUnlockAttempts: 10,
          unlockVaultOnLoad: false,
        }
      );
      await this.vault.setValue('blar', 'stuff');

      // This code blows up on an iOS device without fingerprint/bio and only system passcode
      await this.vault.updateConfig(
        {
          key: 'io.ionic.iv-test-sysp',
          type: VaultType.DeviceSecurity,
          deviceSecurityType: DeviceSecurityType.SystemPasscode,
          lockAfterBackgrounded: 2000,
          shouldClearVaultAfterTooManyFailedAttempts: false,
          customPasscodeInvalidUnlockAttempts: 10,
          unlockVaultOnLoad: false,
        }
      );
    } catch (err) {
      alert(`${err.message} (Error Code: ${err.code})`);
    }
  }

  async lock(): Promise<boolean> {
    try {
      await this.vault.lock();
      console.log('vault was locked');
      return true;
    } catch (err) {
      console.error('vault.service.ts lock()', err);
      return false;
    }
  }

  async unlock() {
    try {
      await this.vault.unlock();
      console.log('vault was unlocked');
    } catch (err) {
      const msg = (typeof err == 'object') ? JSON.stringify(err) : err;
      console.error('vault.service.ts unlock()', msg);
    }
  }

  async useSecure(enabled: boolean) {
    this.config.type = enabled ? VaultType.SecureStorage : VaultType.DeviceSecurity;
    this.config.deviceSecurityType = enabled ? DeviceSecurityType.None : DeviceSecurityType.Biometrics;
    await this.vault.updateConfig(this.config);
    this.setData();

  }

  async getData(): Promise<string> {
    console.log('Get Data....');
    const data = await this.vault.getValue('blar');
    console.log('Get Data', data);
    return data;
  }

  async setData() {
    try {
      console.log('Setting data...');
      await this.vault.setValue('blar', 'test');
      console.log('Data is set');
    } catch (err) {
      console.error('vault.service.ts setData()', err);
    }
  }

  async isEmpty(): Promise<boolean> {
    return await this.vault.isEmpty();
  }

  async isLocked(): Promise<boolean> {
    return await this.vault.isLocked();
  }

  async clear() {
    try {
      await this.vault.clear();
      console.log('Vault was cleared');
    } catch (err) {
      console.error('vault.service.ts clear()', err);
    }
  }

  async hasBiometrics(): Promise<boolean> {
    return await Device.isBiometricsEnabled();
  }
}
