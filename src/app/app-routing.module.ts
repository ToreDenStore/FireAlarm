import { AlarmResponseComponent } from './components/alarm-response/alarm-response.component';
import { UserComponent } from './user/user.component';
import { AlarmListComponent } from './components/alarm-list/alarm-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'alarms', component: AlarmListComponent },
  { path: 'users', component: UserComponent },
  { path: 'response/:id', component: AlarmResponseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
