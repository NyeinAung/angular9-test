import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './contacts/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'contacts/home', pathMatch: 'full'},
  { path: 'contacts', redirectTo: 'contacts/home', pathMatch: 'full'},
  { path: 'contacts/home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
