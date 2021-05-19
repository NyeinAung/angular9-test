import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CrudRoutingModule } from './crud-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CrudModule { }
