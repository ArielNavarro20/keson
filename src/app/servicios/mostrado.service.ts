import { Injectable } from '@angular/core';
import { Mostrado } from '../modelo/mostrado';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class MostradoService {

  constructor(
    private dbService:DbService
  ) { }

  async agregarMostrado(mostrado:Mostrado) {
    this.dbService.insertar(mostrado)    
  }

  async getMostrados():Promise<Mostrado[]> {
    return this.dbService.obtenerTodos()
  }
  
  async getMostradosOrdenadosAlfabeticamente():Promise<Mostrado[]> {
    const mostrado = await this.getMostrados()
    return mostrado?.sort((a,b) => a?.nombre?.localeCompare(b?.nombre))
  }

  async editar(mostrado:Mostrado) {
    await this.dbService.actualizar(mostrado)
  }

  async eliminar(mostrado:Mostrado) {
    if( mostrado.id != undefined && mostrado.id > 0 ) {
      await this.dbService.eliminar(mostrado.id)
    }    
  }
}
