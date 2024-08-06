import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthService } from './auth.service';
import { AuthGuardService, AuthLoginGuardService } from './auth-guard.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CardCollectionListComponent } from './partials/card-collection-list/card-collection-list.component';
import { HomeComponent } from './home/home.component';
import { CardCollectionComponent } from './card-collection/card-collection.component';
import { CardListComponent } from './partials/card-list/card-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WhatIsSmudyComponent } from './what-is-smudy/what-is-smudy.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AddCardCollectionComponent } from './card-collection/add-card-collection/add-card-collection.component';
import { CardComponent } from './card/card.component';
import { AddCardComponent } from './card/add-card/add-card.component';
import { DetailCardComponent } from './card/detail-card/detail-card.component';
import { LearningSessionComponent } from './learning-session/learning-session.component';
import { StatsComponent } from './stats/stats.component';
import { SetsComponent } from './sets/sets.component';
import { FriendsComponent } from './friends/friends.component';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CardFlipComponent } from './card-flip/card-flip.component';
import { CardFlipListComponent } from './card-flip-list/card-flip-list.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SpinnerComponent,
    LogoutComponent,
    UserProfileComponent,
    CardCollectionListComponent,
    HomeComponent,
    CardCollectionComponent,
    CardListComponent,
    WhatIsSmudyComponent,
    AddCardCollectionComponent,
    CardComponent,
    AddCardComponent,
    DetailCardComponent,
    LearningSessionComponent,
    StatsComponent,
    SetsComponent,
    FriendsComponent,
    CardFlipComponent,
    CardFlipListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('JWT_TOKEN_AUTH_ACCESS');
        }
      }
    }),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [HttpClient,AuthService,AuthGuardService,JwtHelperService,AuthLoginGuardService,
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
 }
