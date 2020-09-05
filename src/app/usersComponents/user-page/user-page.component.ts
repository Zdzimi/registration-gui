import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { UserNew } from 'src/app/models/userNew';
import { Institution } from 'src/app/models/institution';
import { Place } from 'src/app/models/place';
import { InitialObject } from 'src/app/models/initialObject';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users: Array<User>;
  userOld = new UserNew();
  userNew = new UserNew();
  detailsVisible = false;
  error: string;
  errorIns: string;

  creatingNewIntitutionVisible = false;
  institutionNew: Institution = {
    institutionId: undefined,
    institutionName: '',
    province: '',
    city: '',
    street: '',
    gateNumber: '',
    premisesNumber: '',
    typeOfService: '',
    description: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private httpService: HttpService,
    private linkMaper: LinkMaperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getUser(params.get('username')).subscribe(
        res => {
          this.users = res;
          this.userOld.userId = this.users[0].userId;
          this.userOld.password = '';
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
        }
      );
    });
  }

  modifyLink(link: string): string {
    return this.linkMaper.mapLink(link);
  }

  displayDetails() {
    this.detailsVisible = true;
  }

  displayCreatingInstitution() {
    this.creatingNewIntitutionVisible = true;
  }

  updateUser() {
    this.httpService.update([this.userOld, this.userNew]).subscribe(
      res => {
        this.authService.setCredentials(this.userNew.username, this.userNew.password);
        this.detailsVisible = false;
        this.users = res;
        this.userOld.userId = this.users[0].userId;
        this.userOld.password = '';
        this.router.navigate(['/registration/' + this.userNew.username]);
        this.userNew = new UserNew();
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.error = 'Nazwa użytkownika już istnieje';
          }
        }
        console.log(err); //  to delete
      }
    );
  }

  create() {
    const initialObject: InitialObject = {
      institution: this.institutionNew,
      user: this.users[0]
    };
    this.httpService.createNewInstitution(initialObject).subscribe(
      res => this.router.navigate(['registration-app/' + this.institutionNew.institutionName]),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.errorIns = 'Nazwa instutucji już istnieje';
          }
        }
      }
    )
  }

  cancel() {
    this.detailsVisible = false;
  }

  cancelCreating() {
    this.creatingNewIntitutionVisible = false;
  }

  showText(rel: string) {
    if (rel === 'lista instytucji') {
      return 'Zbiór wszystich dostępnych instytucji. Przeglądaj i wybierz co Cię interesuje:';
    } else if (rel === 'lista znanych instytucji') {
      return 'Lista zaprzyjaźnionych:';
    } else if (rel === 'wizyty') {
      return 'Zobacz listę Twoich wizyt:';
    } else {
      return 'panel pracownika';
    }
  }

}
