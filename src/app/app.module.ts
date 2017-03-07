import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturesComponent } from './components/features/features.component';
import { WorkComponent } from './components/work/work.component';
import { TeamComponent } from './components/team/team.component';
import { FunFactsComponent } from './components/funfacts/funfacts.component';
import { ContactComponent } from './components/contact/contact.component';
  
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturesComponent,
    WorkComponent,
    TeamComponent,
    FunFactsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
