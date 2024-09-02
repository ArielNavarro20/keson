import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { IonList, IonItem, IonInput, IonButton, IonIcon, IonText } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { addCircleOutline } from 'ionicons/icons'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-formulario-mostrado',
  templateUrl: './formulario-mostrado.component.html',
  styleUrls: ['./formulario-mostrado.component.scss'],
  standalone: true,
  imports: [FormsModule, IonList, IonItem, IonInput, IonButton, IonIcon, IonText]
})
export class FormularioMostradoComponent  implements OnInit {

  mostrado:string = ""
  autor:string = ""
  @Output() onMostradoAgregado = new EventEmitter<string>()

  constructor() { 
    addIcons({
      addCircleOutline
    })
  }

  ngOnInit() {}

  agregarMostrado() {
    this.onMostradoAgregado.emit(this.mostrado + "|" + this.autor)
    this.mostrado = ""
    this.autor = ""
  }
}
