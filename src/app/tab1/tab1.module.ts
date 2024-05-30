import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonContent, IonToggle } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonTitle,
        IonButton,
        IonToggle,
        IonContent
    ],
    declarations: [Tab1Page]
})
export class Tab1PageModule { }
