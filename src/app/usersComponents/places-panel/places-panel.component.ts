import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { Place } from 'src/app/models/place';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-places-panel',
  templateUrl: './places-panel.component.html',
  styleUrls: ['./places-panel.component.css']
})
export class PlacesPanelComponent implements OnInit {

  addPanelVisible = false;
  placeList: Array<Place>;
  error: string;
  place: Place = { placeName: '' };
  institutionName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.institutionName = params.get('institutionName');
      this.httpService.getPlacesPanel(params.get('institutionName')).subscribe(
        res => this.placeList = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              this.error = err.error;
            } else if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
        }
      );
    });
  }

  showAddingPanel() {
    this.addPanelVisible = true;
  }

  cancel() {
    this.addPanelVisible = false;
  }

  addPlace() {
    this.httpService.addPlace(this.place, this.institutionName).subscribe(
      res => {
        this.addPanelVisible = false;
        this.router.navigate([`/registration-app/${this.institutionName}/places/${this.place.placeName}`]);
      },
      err => {
        console.log(err);
      }
    );
  }

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }
}
