import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
    prendido = true;
    apagado = false;

  constructor( public httpClient: HttpClient, public navCtrl: NavController) {
      this.httpClient.get('http://35.243.132.64:3000/sensores/estado').subscribe(data => {
        console.log(data);
        if (data === 0) {
            this.prendido = false;
            this.apagado = true;
        } else {
            this.prendido = true;
            this.apagado = false;
        }
      });
  }
  ngOnInit() {
  }
    encender() {
          const datos = {estado: 1};
          this.httpClient.post('http://35.243.132.64:3000/sensores', datos).subscribe(resp => {
              console.log(resp);
        });
          this.prendido = true;
          this.apagado = false;
    }
    apagar() {
        const datos = {estado: 0};
        this.httpClient.post('http://35.243.132.64:3000/sensores', datos).subscribe(resp => {
              console.log(resp);
        });
        this.prendido = false;
        this.apagado = true;
    }
    goHome() {
      this.navCtrl.navigateRoot('folder/Inbox');
    }
}
