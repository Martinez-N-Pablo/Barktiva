import { inject, Injectable } from '@angular/core';
import { setMetaDescriptionTag } from '../scripts/meta-utils';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private _router: Router = inject(Router);
  
  constructor() { }

  updateDescriptionForCurrentRoute(meta: Meta): void {
    const currentUrl = this._router.url;
    setMetaDescriptionTag(meta, currentUrl);
  }
}
