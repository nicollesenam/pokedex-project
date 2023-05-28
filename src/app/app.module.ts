import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent,
    SearchComponent,
    HeaderComponent,
    LoadMoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
