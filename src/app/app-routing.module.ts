import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PodaciComponent } from './podaci/podaci.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [  {path: '', component: HomeComponent },
{path: 'podaci', component: PodaciComponent,
  children: [
    {path:':id', component: StudentDetailsComponent}
  ]
 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
