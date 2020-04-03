import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  eventos: any;

  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
      this.httpClient.get('http://35.243.132.64:3000/sensores').subscribe(data => {
          this.eventos = data;
          console.log(data);
      });
  }

  ngOnInit() {
  }
    goHome() {
        this.navCtrl.navigateRoot('folder/Inbox');
    }
}
