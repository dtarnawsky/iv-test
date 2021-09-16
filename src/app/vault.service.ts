import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.iv-test-bio',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Biometrics,
    lockAfterBackgrounded: null,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: false,
  };

  vault: Vault | BrowserVault;

  constructor(private platform: Platform) {

    this.init();
  }

  async init() {
    await this.platform.ready();

    this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(this.config) : new Vault(this.config);
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError((err) => {
      console.log('Vault error', err);
    });
  }

  async lock() {
    try {
      await this.vault.lock();
    } catch (err) {
      console.error('vault.service.ts lock()', err);
    }
  }

  async unlock() {
    try {
      await this.vault.unlock();
    } catch (err) {
      console.error('vault.service.ts unlock()', err);
    }
  }

  async setData() {
    try {
      await this.vault.setValue("blar", "test");
    } catch (err) {
      console.error('vault.service.ts setData()', err);
    }
  }

  async clear() {
    try {
      await this.vault.clear();
    } catch (err) {
      console.error('vault.service.ts clear()', err);
    }
  }

  async hasBiometrics() : Promise<boolean> {
    return await Device.isBiometricsEnabled();
  }
}
