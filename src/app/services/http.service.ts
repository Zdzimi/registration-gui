import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserNew } from '../models/userNew';
import { Institution } from '../models/institution';
import { Visit } from '../models/visit';
import { MonthTimetable } from '../models/monthTimetable';
import { DayTimetable } from '../models/dayTimetable';
import { Place } from '../models/place';
import { Template } from '../models/template';
import { InitialObject } from '../models/initialObject';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:8080/registration/';
  private urlPanel = 'http://localhost:8080/registration-app/';

  constructor(private httpClient: HttpClient) { }

  registry(user: UserNew): Observable<any> {
    return this.httpClient.post<any>(this.url + 'new-user', user);
  }

  update(users: Array<UserNew>): Observable<any> {
    return this.httpClient.post<any>(`${this.url}update-user`, users);
  }

  getUser(username: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.url + username);
  }

  getInstitutions(username: string): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.url + username}/institutions`);
  }

  getKnowedInstitutions(username: string): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.url + username}/institutions/know`);
  }

  getInstitution(username: string, institutionName: string): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(`${this.url + username}/institutions/${institutionName}`);
  }

  getVisitsList(username: string): Observable<Array<Visit>> {
    return this.httpClient.get<Array<Visit>>(`${this.url + username}/visits`);
  }

  getVisit(username: string, visitId: string): Observable<Array<Visit>> {
    return this.httpClient.get<Array<Visit>>(`${this.url + username}/visits/${visitId}`);
  }

  cancelVisit(link: string): Observable<Visit> {
    return this.httpClient.get<Visit>(link);
  }

  getRepresentatives(username: string, institutionName: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.url + username}/institutions/${institutionName}/representatives`);
  }

  getRepresentativesPanel(institutionName: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.urlPanel + institutionName}/representatives`);
  }

  getRepresentative(
    username: string,
    institutionName: string,
    representativeName: string
  ): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.url + username}/institutions/${institutionName}/representatives/${representativeName}`);
  }

  getRepresentativePanel(
    institutionName: string,
    representativeName: string
  ): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.urlPanel + institutionName}/representatives/${representativeName}`);
  }

  getTimetables(
    username: string,
    institutionName: string,
    representativeName: string
  ): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>
      (`${this.url + username}/institutions/${institutionName}/representatives/${representativeName}/timetables`);
  }

  getTimetablesPanel(
    institutionName: string,
    representativeName: string
  ): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables`
    );
  }

  getTimetablesPanelByYear(
    institutionName: string,
    representativeName: string,
    year: string
  ): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/y/${year}`
    );
  }

  getTimetableSing(
    username: string,
    institutionName: string,
    representativeName: string,
    yearmonth: string
  ): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>(
      `${this.url + username}/institutions/${institutionName}/representatives/${representativeName}/timetables/${yearmonth}`
    );
  }

  getTimetablePanelSing(
    institutionName: string,
    representativeName: string,
    year: string,
    month: string
  ): Observable<Array<MonthTimetable>> {
    return this.httpClient.get<Array<MonthTimetable>>
      (`${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/y/${year}/m/${month}`);
  }

  getDaytimetable(
    username: string,
    institutionName: string,
    representativeName: string,
    yearmonth: string,
    day: string
  ): Observable<Array<DayTimetable>> {
    return this.httpClient.get<Array<DayTimetable>>
      (`${this.url + username}/institutions/${institutionName}/representatives/${representativeName}/timetables/${yearmonth}/${day}`);
  }

  getDaytimetablePanel(
    institutionName: string,
    representativeName: string,
    year: string,
    month: string,
    day: string
  ): Observable<Array<DayTimetable>> {
    return this.httpClient.get<Array<DayTimetable>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/y/${year}/m/${month}/d/${day}`
    );
  }

  getBookVisit(
    username: string,
    institutionName: string,
    representativeName: string,
    yearmonth: string,
    day: string,
    visitId: string
  ): Observable<Array<Visit>> {
    return this.httpClient.get<Array<Visit>>
      (`${this.url + username}/institutions/${institutionName}/representatives/${representativeName}/timetables/${yearmonth}/${day}/${visitId}`);
  }

  bookVisit(link: string): Observable<any> {
    return this.httpClient.get<any>(link);
  }

  getInstitutionPanel(institutionName: string): Observable<Array<Institution>> {
    return this.httpClient.get<Array<Institution>>(this.urlPanel + institutionName);
  }

  addRepresentative(institutionName: string, username: string): Observable<any> {
    return this.httpClient.post<any>(this.urlPanel + institutionName + '/representatives', username);
  }

  getPlacesPanel(institutionName: string): Observable<Array<Place>> {
    return this.httpClient.get<Array<Place>>(`${this.urlPanel + institutionName}/places`);
  }

  addPlace(place: Place, institutionName: string): Observable<Place> {
    return this.httpClient.post<Place>(`${this.urlPanel + institutionName}/places`, place);
  }

  getPlaceSingleton(institutionName: string, placeName: string): Observable<Array<Place>> {
    return this.httpClient.get<Array<Place>>(`${this.urlPanel + institutionName}/places/${placeName}`);
  }

  deletePlace(link: string): Observable<any> {
    return this.httpClient.delete<any>(link);
  }

  getUsers(institutionName: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.urlPanel + institutionName + '/users');
  }

  getUserSingleton(institutionName: string, username: string): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.urlPanel + institutionName}/users/${username}`);
  }

  getUsersVisitSingleton(institutionName: string, username: string, visitId: string): Observable<Array<Visit>> {
    return this.httpClient.get<Array<Visit>>(`${this.urlPanel + institutionName}/users/${username}/${visitId}`);
  }

  getDayTemplate(
    institutionName: string,
    representativeName: string,
    year: string,
    month: string,
    day: string
  ): Observable<Array<Template>> {
    return this.httpClient.get<Array<Template>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/y/${year}/m/${month}/d/${day}/get-template`
    );
  }

  getMonthTemplate(
    institutionName: string,
    representativeName: string,
    year: string,
    month: string
  ): Observable<Array<Template>> {
    return this.httpClient.get<Array<Template>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/y/${year}/m/${month}/get-template`
    );
  }

  getNextTemplate(
    institutionName: string,
    representativeName: string
  ): Observable<Array<Template>> {
    return this.httpClient.get<Array<Template>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/get-next-template`
    );
  }

  sendTemplate(template: Template, url: string): Observable<any> {
    return this.httpClient.post<any>(url, template);
  }

  getVisitSingleton(
    institutionName: string,
    representativeName: string,
    year: string,
    month: string,
    day: string,
    visitId: string
  ): Observable<Array<Visit>> {
    return this.httpClient.get<Array<Visit>>(
      `${this.urlPanel + institutionName}/representatives/${representativeName}/timetables/y/${year}/m/${month}/d/${day}/v/${visitId}`
    );
  }

  deleteVisit(link: string): Observable<any> {
    return this.httpClient.delete<any>(link);
  }

  createNewInstitution(initialObject: InitialObject): Observable<any> {
    return this.httpClient.post<any>(this.urlPanel, initialObject);
  }
}
