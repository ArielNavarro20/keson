import { Component, OnInit, ViewChild } from '@angular/core'
import { IonButtons, IonButton, IonIcon, 
         IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone'
import { ListaDeCitasComponent } from '../lista-de-citas/lista-de-citas.component'
import { addIcons } from 'ionicons'
import { settingsOutline } from 'ionicons/icons'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
  standalone: true,
  imports: [ListaDeCitasComponent, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, 
            IonButtons, IonButton, IonIcon],
})
export class AdminPage implements OnInit {
  @ViewChild(ListaDeCitasComponent) listaDeCitasComponent!:ListaDeCitasComponent

  constructor() {
    addIcons({
      settingsOutline
    })
  }
  ngOnInit(): void {
    console.log("AdminPage::ngOnInit")
  }
  ionViewWillEnter():void {
    console.log("AdminPage::ionViewWillEnter")
    this.listaDeCitasComponent.ionViewWillEnter() 
  }
 
 
  }


