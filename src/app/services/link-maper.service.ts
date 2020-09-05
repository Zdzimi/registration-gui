import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkMaperService {

  constructor() { }

  mapLink(link: string): string {
    return link.replace('http://localhost:8080', '');
  }
}
