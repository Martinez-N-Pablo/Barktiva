import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MetaService } from './core/services/meta.service';
import { Meta } from '@angular/platform-browser';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private _meta: Meta = inject(Meta);
  constructor(private _router: Router, private _metaService: MetaService) {}

  ngOnInit(): void {
    // Se elimina tema oscuro
    document.body.classList.remove('dark');
    document.body.classList.add('light');

    // Actualiza los metadatos de las paginas
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._metaService.updateDescriptionForCurrentRoute(this._meta);
      }
    });
    this._handlePermissions();
    this._createDefaultNotificationChannel();
  }

  /**
   * Comprueba que la aplicacion tenga los permisos para enviar notificaciones.
   * Si los tiene, no hace nada.
   * Si no los tiene, los solicita.
   */
   private async _handlePermissions(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return; // Solo moviles

    const permStatus = await LocalNotifications.checkPermissions();
    
    if (permStatus.display !== 'granted') {
      const permResult = await LocalNotifications.requestPermissions();

      if (permResult.display !== 'granted') {
        return;
      }
    }
  }

   private async _createDefaultNotificationChannel(): Promise<void> {
    // Comrpueba que el SO del dispositivo es un dispositivo movil, no un ordenador y crea el canal para las notificaciones.
    if(Capacitor.isNativePlatform()){
      try {
        await LocalNotifications.createChannel({
          id: 'default',
          name: 'Default',
          importance: 5,
          sound: 'default',
          vibration: true,
        }); 
      } catch (error) {
        console.error('Error al crear el canal:', error);
      }
    }
  }
}
