import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollComponent } from './components/enroll/enroll.component';
import { EnrolledComponent } from './components/enrolled/enrolled.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },  
  { path:  'Home', component:  HomeComponent},  
  {path:'enroll', component:EnrollComponent},
  {path:'enrolled', component:EnrolledComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
