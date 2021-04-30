import { DataLocalService } from './../../services/data-local.service';
import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev:false,
    allowSlideNext:false
  };

  constructor( private barcodeScanner: BarcodeScanner,
               private dataLocal: DataLocalService) {}


  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if(!barcodeData.cancelled){
        this.dataLocal.guardarRegistro(barcodeData.format,barcodeData.text);
      }
     }).catch(err => {
         console.log('Error', err);

         //this.dataLocal.guardarRegistro('QRCode','https://ionicframework.com');
         this.dataLocal.guardarRegistro('QRCode','geo:41.4508647,2.1908592');

     });
  }



}
