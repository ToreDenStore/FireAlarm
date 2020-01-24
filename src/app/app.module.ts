import { TeamComponent } from './components/team/team.component';
import { DemoComponent } from './components/demo/demo.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlarmNewComponent } from './components/alarm-new/alarm-new.component';
import { AlarmResponseService } from './services/alarm-response.service';
import { AlarmResponseComponent } from './components/alarm-response/alarm-response.component';
import { AlarmListComponent } from './components/alarm-list/alarm-list.component';
import { AlarmService } from './services/alarm.service';
import { AlarmComponent } from './components/alarm/alarm.component';
import { UserService } from './user.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      AlarmComponent,
      AlarmListComponent,
      AlarmResponseComponent,
      AlarmNewComponent,
      AdminComponent,
      DemoComponent,
      TeamComponent
   ],
   imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebase, 'FireAlarm'),
      AngularFirestoreModule,
      AppRoutingModule,
      NgbModule,
      FormsModule
   ],
   providers: [
     UserService,
     AlarmService,
     AlarmResponseService
   ],
   bootstrap: [
      AppComponent,
      AlarmNewComponent
   ]
})
export class AppModule { }
