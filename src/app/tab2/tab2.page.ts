import { Component } from '@angular/core';
import { Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultError, VaultType } from '@ionic-enterprise/identity-vault';
import { VaultLockEvent } from '@ionic-enterprise/identity-vault/dist/typings/VaultInterface';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  config: IdentityVaultConfig = {
    key: 'io.ionic.iv-test-both',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Both,
    unlockVaultOnLoad: false,
  };

  vault: Vault;

  constructor() { }

  async getStatus() {
    alert(`isSystemPasscodeSet=${await Device.isSystemPasscodeSet()} isBiometricsEnabled=${await Device.isBiometricsEnabled()}`);
  }

  setVault() {
    this.vault = new Vault(this.config);
    this.vault.onError((err: VaultError) => {
      alert('Vault Error: ' + JSON.stringify(err));
    });
    this.vault.onLock((lockEvent: VaultLockEvent) => {
      alert('Vault is Locked ' + JSON.stringify(lockEvent));
    });
    this.vault.onUnlock(() => {
      alert('Vault is unlocked');
    });
  }

  async setVaultValue() {
    try {
      await this.vault.setValue('stuff', 'things');
    } catch (err) {
      alert(err);
    }
  }

  async clearVault() {
    try {
      await this.vault.clear();
    } catch (err) {
      alert(err);
    }
  }

}
