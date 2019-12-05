import { AlarmResponeService } from './services/alarm-respone.service';
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

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      AlarmComponent,
      AlarmListComponent,
      AlarmResponseComponent
   ],
   imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebase,
      'FireAlarm'),
      AngularFirestoreModule,
   ],
   providers: [
     UserService,
     AlarmService,
     AlarmResponeService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
