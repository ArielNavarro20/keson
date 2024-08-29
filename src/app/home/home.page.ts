import { Component, OnInit, ViewChild } from '@angular/core'
import { IonButtons, IonButton, IonIcon, 
         IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone'
import { ListaDeCitasComponent } from '../lista-de-citas/lista-de-citas.component'
import { addIcons } from 'ionicons'
import { settingsOutline } from 'ionicons/icons'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ListaDeCitasComponent, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, 
            IonButtons, IonButton, IonIcon],
})
export class HomePage implements OnInit {
  @ViewChild(ListaDeCitasComponent) listaDeCitasComponent!:ListaDeCitasComponent

  constructor() {
    addIcons({
      settingsOutline
    })
  }
  ngOnInit(): void {
    console.log("HomePage::ngOnInit")
  }
  ionViewWillEnter():void {
    console.log("HomePage::ionViewWillEnter")
    this.listaDeCitasComponent.ionViewWillEnter() 
  }
 
 
  }


