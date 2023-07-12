import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguageComponent } from './components/language/language.component';
import { TagContainerComponent } from './components/tag-container/tag-container.component';

@NgModule({
  declarations: [AppComponent, LanguageComponent, TagContainerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
