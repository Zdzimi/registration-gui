import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './usersComponents/home-page/home-page.component';
import { UserPageComponent } from './usersComponents/user-page/user-page.component';
import { InstitutionsPageComponent } from './usersComponents/institutions-page/institutions-page.component';
import { InstitutionPageComponent } from './usersComponents/institution-page/institution-page.component';
import { VisitsPageComponent } from './usersComponents/visits-page/visits-page.component';
import { VisitPageComponent } from './usersComponents/visit-page/visit-page.component';
import { RepresentativesPageComponent } from './usersComponents/representatives-page/representatives-page.component';
import { RepresentativePageComponent } from './usersComponents/representative-page/representative-page.component';
import { TimetablesPageComponent } from './usersComponents/timetables-page/timetables-page.component';
import { TimetablePageComponent } from './usersComponents/timetable-page/timetable-page.component';
import { DayTimetablePageComponent } from './usersComponents/day-timetable-page/day-timetable-page.component';
import { PlacesPanelComponent } from './usersComponents/places-panel/places-panel.component';
import { UsersPanelComponent } from './usersComponents/users-panel/users-panel.component';
import { UserPanelComponent } from './usersComponents/user-panel/user-panel.component';
import { PlacePanelComponent } from './usersComponents/place-panel/place-panel.component';
import { TemplatePanelComponent } from './usersComponents/template-panel/template-panel.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'registration/:username',
    component: UserPageComponent
  },
  {
    path: 'registration/:username/institutions',
    component: InstitutionsPageComponent
  },
  {
    path: 'registration/:username/institutions/know',
    component: InstitutionsPageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName',
    component: InstitutionPageComponent
  },
  {
    path: 'registration/:username/visits',
    component: VisitsPageComponent
  },
  {
    path: 'registration/:username/visits/:visitId',
    component: VisitPageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName/representatives',
    component: RepresentativesPageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName/representatives/:representativeName',
    component: RepresentativePageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName/representatives/:representativeName/timetables',
    component: TimetablesPageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName/representatives/:representativeName/timetables/:yearmonth',
    component: TimetablePageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName/representatives/:representativeName/timetables/:yearmonth/:day',
    component: DayTimetablePageComponent
  },
  {
    path: 'registration/:username/institutions/:institutionName/representatives/:representativeName/timetables/:yearmonth/:day/:visitId',
    component: VisitPageComponent
  },
  {
    path: 'registration-app/:institutionName',
    component: InstitutionPageComponent
  },
  {
    path: 'registration-app/:institutionName/places',
    component: PlacesPanelComponent
  },
  {
    path: 'registration-app/:institutionName/places/:placeName',
    component: PlacePanelComponent
  },
  {
    path: 'registration-app/:institutionName/users',
    component: UsersPanelComponent
  },
  {
    path: 'registration-app/:institutionName/users/:username',
    component: UserPanelComponent
  },
  {
    path: 'registration-app/:institutionName/users/:username/:visitId',
    component: VisitPageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives',
    component: RepresentativesPageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName',
    component: RepresentativePageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables',
    component: TimetablesPageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/y/:year',
    component: TimetablesPageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/y/:year/m/:month',
    component: TimetablePageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/y/:year/m/:month/d/:day',
    component: DayTimetablePageComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/y/:year/m/:month/d/:day/get-template',
    component: TemplatePanelComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/y/:year/m/:month/get-template',
    component: TemplatePanelComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/get-next-template',
    component: TemplatePanelComponent
  },
  {
    path: 'registration-app/:institutionName/representatives/:representativeName/timetables/y/:year/m/:month/d/:day/v/:visitId',
    component: VisitPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
