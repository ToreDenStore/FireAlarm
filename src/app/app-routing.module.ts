import { DemoComponent } from './components/demo/demo.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { AlarmResponseComponent } from './components/alarm-response/alarm-response.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'alarm/:id', component: AlarmComponent },
  { path: 'response/:id', component: AlarmResponseComponent },
  { path: 'demo', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
