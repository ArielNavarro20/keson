import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import {IonList, IonItem, IonLabel, IonCheckbox, CheckboxChangeEventDetail} 
                          from '@ionic/angular/standalone'
import { Mostrado } from '../modelo/mostrado'
import { IonCheckboxCustomEvent } from '@ionic/core'

@Component({
  selector: 'app-lista-de-mostrados',
  templateUrl: './lista-de-mostrados.component.html',
  styleUrls: ['./lista-de-mostrados.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonCheckbox]
})
export class ListaDeMostradosComponent  implements OnInit {

  @Input() mostrados:Mostrado[] = []
  @Output() onChange = new EventEmitter<Mostrado>()

  constructor() { }

  ngOnInit() {
    console.log("ListaDeMostradosComponent::ngOnInit()")
  }

  ionViewWillEnter() {
    console.log("ListaDeMostradosComponent::ionViewWillEnter()")
  }

  onVerChange(m:Mostrado, $event: IonCheckboxCustomEvent<CheckboxChangeEventDetail<any>>) {
    const ver = $event.detail.checked 
    m.ver = ver
    this.onChange.emit(m)
  }
}
