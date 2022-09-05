import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUplotModule } from 'projects/ngx-uplot/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxUplotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
