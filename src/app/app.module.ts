import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicRouteStrategy, provideIonicAngular, IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaultService } from './vault.service';

const appInitFactory =
    (vaultService: VaultService): (() => Promise<void>) =>
        async () => {
            await vaultService.init();
        }

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, IonApp, IonRouterOutlet],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: APP_INITIALIZER, useFactory: appInitFactory, deps: [VaultService], multi: true },
        provideIonicAngular()],
    bootstrap: [AppComponent]
})
export class AppModule { }
