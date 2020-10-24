import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MonacoLanguageEditorComponent } from './monaco-language-editor/monaco-language-editor.component';

import { MonacoConfig } from './monaco-language-editor/monaco-config';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LanguagesComponent} from './languages/languages.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LanguagesComponent,
    ContactComponent,
    NoPageFoundComponent,
    MonacoLanguageEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(MonacoConfig) // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

