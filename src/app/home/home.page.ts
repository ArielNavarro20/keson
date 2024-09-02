import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaDeCitasComponent } from '../lista-de-citas/lista-de-citas.component';


@Component({   //componenete con las rutas 
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ListaDeCitasComponent]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
