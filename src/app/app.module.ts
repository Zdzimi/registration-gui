import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './usersComponents/home-page/home-page.component';
import { UserPageComponent } from './usersComponents/user-page/user-page.component';
import { InstitutionsPageComponent } from './usersComponents/institutions-page/institutions-page.component';
import { InstitutionPageComponent } from './usersComponents/institution-page/institution-page.component';
import { VisitsPageComponent } from './usersComponents/visits-page/visits-page.component';
import { VisitPageComponent } from './usersComponents/visit-page/visit-page.component';
import { RepresentativesPageComponent } from './usersComponents/representatives-page/representatives-page.component';
import { RepresentativePageComponent } from './usersComponents/representative-page/representative-page.component';
import { TimetablesPageComponent } from './usersComponents/timetables-page/timetables-page.component';
import { NumPipe } from './pipes/num.pipe';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TimetablePageComponent } from './usersComponents/timetable-page/timetable-page.component';
import { DayTimetablePageComponent } from './usersComponents/day-timetable-page/day-timetable-page.component';
import { PlacesPanelComponent } from './usersComponents/places-panel/places-panel.component';
import { UsersPanelComponent } from './usersComponents/users-panel/users-panel.component';
import { UserPanelComponent } from './usersComponents/user-panel/user-panel.component';
import { PlacePanelComponent } from './usersComponents/place-panel/place-panel.component';
import { TemplatePanelComponent } from './usersComponents/template-panel/template-panel.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    InstitutionsPageComponent,
    InstitutionPageComponent,
    VisitsPageComponent,
    VisitPageComponent,
    RepresentativesPageComponent,
    RepresentativePageComponent,
    TimetablesPageComponent,
    NumPipe,
    NavBarComponent,
    TimetablePageComponent,
    DayTimetablePageComponent,
    PlacesPanelComponent,
    UsersPanelComponent,
    UserPanelComponent,
    PlacePanelComponent,
    TemplatePanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
