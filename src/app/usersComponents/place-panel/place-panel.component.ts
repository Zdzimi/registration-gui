import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-place-panel',
  templateUrl: './place-panel.component.html',
  styleUrls: ['./place-panel.component.css']
})
export class PlacePanelComponent implements OnInit {

  placeSingleton: Array<Place>;
  error: string;
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
      this.httpService.getPlaceSingleton(params.get('institutionName'), params.get('placeName')).subscribe(
        res => {
          console.log(res);
          this.placeSingleton = res;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            } else if (err.status === 404) {
              this.error = err.error;
            }
          }
        }
      );
    });
  }

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }

  render(value: string) {
    return value === this.placeSingleton[0].placeName ? 'usuń' : 'wróć do ' + this.institutionName.replace('%20', ' ');
  }

  click(link: Link) {
    if (link.rel === this.placeSingleton[0].placeName) {
      this.httpService.deletePlace(link.href).subscribe(
        res => this.router.navigate(['/registration-app/' + this.institutionName + '/places']),
        err => this.error = err.error
      );
    } else {
      this.router.navigate([this.modifyLink(link.href)]);
    }
  }
}
