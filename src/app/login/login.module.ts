import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoginPageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonLabel,
        IonInput
    ],
    declarations: [LoginPage]
})
export class LoginPageModule { }
