
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS, MatNativeDateModule
} from '@angular/material/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiagnosticFormComponent } from './components/diagnostic-form/diagnostic-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import { DiagnosticResponseComponent } from './components/diagnostic-response/diagnostic-response.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DictionaryService} from "./services/dictionary.service";
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MomentDateAdapter } from '@angular/material-moment-adapter';



export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DiagnosticFormComponent,
    DiagnosticResponseComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,

  ],
  providers: [  MatDatepickerModule, DictionaryService,
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
