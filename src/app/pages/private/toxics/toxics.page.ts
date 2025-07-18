import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ToxicInterface } from '@app/core/interfaces/toxic';
import { ToxicComponent } from '@app/components/toxic/toxic.component';
import { ToxicFacadeService } from '@app/core/presenters/toxic-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesName } from '@app/core/const/magicStrings';

@Component({
  selector: 'app-toxics',
  templateUrl: './toxics.page.html',
  styleUrls: ['./toxics.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToxicComponent, IonIcon, IonButton]
})
export class ToxicsPage implements OnInit {
  private _toxicFacadeService: ToxicFacadeService = inject(ToxicFacadeService);
  private _router: Router = inject(Router);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  title: string = "Alimentos tóxicos";

  toxicList: ToxicInterface[] = [];

  lastPetId: string = "";

  constructor() { }

  ngOnInit() {
    this._getToxics();
    this._getPetId();
  }

  private async _getToxics(): Promise<void> {
    const toxics = await this._toxicFacadeService.getAllToxics();

    if(toxics) {
      this.toxicList = toxics;
    }
  }

  private _getPetId(): void {
    this.lastPetId = this._activatedRoute.snapshot.paramMap.get('petId')!;
  }

  goBack(): void {
    this._router.navigate([`${RoutesName.petForm}/${this.lastPetId}`]);
  }
}
