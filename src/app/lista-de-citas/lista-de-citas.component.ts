import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormularioMostradoComponent } from '../formulario-mostrado/formulario-mostrado.component';
import { ListaDeMostradosComponent } from '../lista-de-mostrados/lista-de-mostrados.component';
import { Mostrado } from '../modelo/mostrado';
import { MostradoService } from '../servicios/mostrado.service';
import { ConfiguracionService } from '../servicios/configuracion.service';
import { DbService } from '../servicios/db.service';

@Component({
  selector: 'app-lista-de-citas',
  templateUrl: './lista-de-citas.component.html',
  styleUrls: ['./lista-de-citas.component.scss'],
  standalone: true,
  imports: [FormularioMostradoComponent, ListaDeMostradosComponent]
})
export class ListaDeCitasComponent  implements OnInit, OnDestroy { //inicializador y destructor

  mostrados:Mostrado[] = []
  ordenarAlfabeticamente:boolean = false 

  constructor( //para la db
    private dbService:DbService,
    private mostradoService:MostradoService,
    private configuracionService:ConfiguracionService
  ) { }
  //inicializacion db
  async ngOnInit() {
    console.log("ListaDeCitasComponent::ngOnInit - DbService::iniciarPlugin()")    
    await this.dbService.iniciarPlugin() 
    await this.actualizar() 
  }

  async ngOnDestroy() {
    console.log("ListaDeCitasComponent::ngOnDestroy")    
    await this.dbService.cerrarConexion() 
  }

  async ionViewWillEnter() {
    console.log("ListaDeCitasComponent::ionViewWillEnter")
    if( this.dbService.iniciado ) {
      console.log("dbService INICIADO -- actualizar()")
      await this.actualizar()    
    } else {
      console.log("dbService AUN NO INICIADO")
    }    
  }
 
  async actualizar() {
    console.log("actualizando...")
    this.ordenarAlfabeticamente = await this.configuracionService.ordenarRegistros()
    if( this.ordenarAlfabeticamente ) {
      this.mostrados = await this.mostradoService.getMostradosOrdenadosAlfabeticamente() 
    } else {
      this.mostrados = await this.mostradoService.getMostrados() 
    }
  }

  async agregarMostrado(mostradoStr: string) {  
    const [nombre, autor] = mostradoStr.split("|")  
    const m:Mostrado = {
      nombre: nombre,
      ver: false,
      autor: autor
    }
    await this.mostradoService.agregarMostrado(m)
    await this.actualizar()
  }

  async onMostradoChange(m: Mostrado) {
    await this.mostradoService.editar(m)
    if (m.id) {
      await this.dbService.eliminar(m.id)
    }
    this.actualizar()
  }
}
