import { browser } from 'protractor';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Registro } from './../models/registro.model';
import { Injectable } from '@angular/core';
import{ Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {


  guardados: Registro[] = [];

  constructor(private storage: Storage,
              private navCtlr: NavController,
              private InAppBrowser: InAppBrowser) { 
    this.cargarStorage();
  }

  async cargarStorage(){
    this.guardados = await this.storage.get('registros') || [];
  }


  async guardarRegistro(format: string, text: string){

    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);

    console.log(this.guardados);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro){

    this.navCtlr.navigateForward('/tabs/tab2');

    switch ( registro.type ){

      case 'http':
        this.InAppBrowser.create(registro.text,'_system');
      break;

      case 'geo':
        this.navCtlr.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        
      break;
    }
  }
}
