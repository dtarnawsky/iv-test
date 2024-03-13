import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab2PageRoutingModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton
    ],
    declarations: [Tab2Page]
})
export class Tab2PageModule { }
