import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.iv-test',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Both,
    lockAfterBackgrounded: 20000,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: false,
  };

  vault: Vault | BrowserVault;

  constructor() {
    this.init();
   }

   async init() {
     this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(this.config) : new Vault(this.config);
   }

   async lock() {
     await this.vault.lock();
   }
}
