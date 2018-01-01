import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
// Material Design modules by Google material.angular.io/
// import { MdButtonModule } from '@angular2-material/button';
// import { MdCardModule } from '@angular2-material/card';
// import { MdCoreModule } from '@angular2-material/core';
// import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
// import { MdToolbarModule } from '@angular2-material/toolbar';
// import { MdSpinner } from '@angular2-material/progress-circle';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { FeedService } from './feed.service';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FeedformComponent } from './feedform/feedform.component';
import { UserFeedComponent } from './user-feed/user-feed.component';

const appRoutes : Routes  = [
{path:'', component:DashboardComponent},
{path:'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'profile', component:ProfileComponent},
{path:'feedform', component:FeedformComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    StripHtmlTagsPipe,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    FeedformComponent,
    UserFeedComponent
    // MdSpinner
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
    // MdButtonModule,
    // MdCardModule,
    // MdCoreModule,
    // MdIconModule,
    // MdToolbarModule
  ],
  providers: [
  FeedService,
  ValidateService,
  AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }