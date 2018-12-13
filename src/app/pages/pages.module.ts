import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { RxjsComponent } from './rxjs/rxjs.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
    
        RxjsComponent,
   
    ],
    exports:[
        DashboardComponent,
    
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        BrowserModule,
    ]
})
export class PagesModule{}