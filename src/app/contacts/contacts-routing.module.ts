import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: 'contacts', redirectTo: 'contacts/home', pathMatch: 'full'},
  { path: 'contacts/home', component: HomeComponent },
  { path: 'contacts/create', component: CreateComponent },
  { path: 'contacts/update/:contactId', component: UpdateComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
