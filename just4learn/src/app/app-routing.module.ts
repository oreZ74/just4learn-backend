import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { WhatIsSmudyComponent } from './what-is-smudy/what-is-smudy.component';
import { StatsComponent } from './stats/stats.component';

import {
  AuthGuardService as AuthGuard,
  AuthLoginGuardService as AuthLoginGuard
} from './auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CardCollectionComponent } from './card-collection/card-collection.component';
import { AddCardComponent } from './card/add-card/add-card.component';
import { DetailCardComponent } from './card/detail-card/detail-card.component';
import { LearningSessionComponent } from './learning-session/learning-session.component';
import { SetsComponent } from './sets/sets.component';
import { FriendsComponent } from './friends/friends.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // AUTHENTICATION /////////////////////////////////////////////////////////////////////////////
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },

  // USER PROFILE //////////////////////////////////////////////////////////////////////////////////
  {
    path: 'users/:userId/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  // CARD COLLECTIONS //////////////////////////////////////////////////////////////////////////////
  {
    path: 'users/:userId/card_collections/:collectionId',
    component: CardCollectionComponent,
    canActivate: [AuthGuard]
  },
  // CARDS /////////////////////////////////////////////////////////////////////////////////////////
  {
    path: 'users/:userId/card_collections/:collectionId/add',
    component: AddCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:userId/card_collections/:collectionId/card/:cardId/detail',
    component: DetailCardComponent,
    canActivate: [AuthGuard]
  },

  // LEARNING SESSION //////////////////////////////////////////////////////////////////////////////
  {
    path: 'users/:userId/card_collections/:collectionId/learningsession',
    component: LearningSessionComponent,
    canActivate: [AuthGuard]
  },



  // HOME ///////////////////////////////////////////////////////////////////////////////////////////
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "about",
    component: WhatIsSmudyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "stats",
    component: StatsComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: "sets",
    component: SetsComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: "friends",
    component: FriendsComponent,
    canActivate: [AuthGuard]
  }, 
   {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path: '**', redirectTo: 'home' ,pathMatch: 'full'

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
