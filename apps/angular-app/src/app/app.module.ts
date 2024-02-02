import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './views/template-form/template-form.component';
import { ReactiveFormComponent } from './views/reactive-form/reactive-form.component';
import { OperationsFormComponent } from './views/operations-form/operations-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    OperationsFormComponent
 ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }