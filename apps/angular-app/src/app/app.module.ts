import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
 ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }