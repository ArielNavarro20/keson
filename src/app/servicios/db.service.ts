import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Mostrado } from '../modelo/mostrado';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!:SQLiteDBConnection
  platform: string = "";
  iniciado:boolean = false 
  
  private readonly DB_NAME        = "lista_citas"
  private readonly DB_VERSION     = 1
  private readonly DB_ENCRYPTION  = false
  private readonly DB_MODE        = "no-encryption"
  private readonly DB_READ_ONLY   = false

  private readonly DB_TABLE_NAME = "lista_citas"
  private readonly DB_COL_ID    = "id"
  private readonly DB_COL_PROD  = "nombre"
  private readonly DB_COL_COMP  = "ver"

  private readonly DB_SQL_TABLES = `
    CREATE TABLE IF NOT EXISTS ${this.DB_TABLE_NAME}(
      ${this.DB_COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.DB_COL_PROD} TEXT NOT NULL,
      ${this.DB_COL_COMP} INTEGER DEFAULT 0,
      autor TEXT NOT NULL
    );
  `
  

  constructor() {}

  async iniciarPlugin() {
    try {
      console.log("DbService::iniciarPlugin")
      this.platform = Capacitor.getPlatform()
  
      console.log("DbService::iniciarPlugin plataform="+this.platform)
      if(this.platform == "web") {        
        await customElements.whenDefined('jeep-sqlite')        
        const jeepSqliteEl = document.querySelector('jeep-sqlite')
        if(jeepSqliteEl != null) {
          console.log("DbService::iniciarPlugin::initWebStore")
          await this.sqlite.initWebStore()
        }
      }
  
      console.log("sqlite::createConnection()")
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRYPTION,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
      console.dir(this.db)    
  
      console.log("db.open()")      
      const ret = await this.sqlite.checkConnectionsConsistency()
      const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;      
      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
      } else {
        this.db = await this.sqlite.createConnection(this.DB_NAME, this.DB_ENCRYPTION, this.DB_MODE, this.DB_VERSION, this.DB_READ_ONLY);
      }    

      await this.db.open() 
      console.dir(this.db)    
  
      console.log("db.execute(SQL_TABLES)")
      console.log(this.DB_SQL_TABLES)
      await this.db.execute(this.DB_SQL_TABLES)

      await this.insertar({
        nombre: "La única forma de hacer un gran trabajo es amar lo que haces",
        ver: false,
        autor: "Steve Jobs"
      })
      await this.insertar({
        nombre: "La mente es todo. Lo que piensas, te conviertes",
        ver: false,
        autor: "Buda"
      })

      if(this.platform == "web") {
        console.log("DbService::iniciarPlugin::saveStore()")
        await this.sqlite.saveToStore(this.DB_NAME)
      }
      this.iniciado = true 
    } catch(e) {
      console.error(e)
    }
    
  }

  async cerrarConexion() {
    await this.db.close() 
  }

  async obtenerTodos():Promise<Mostrado[]> {
    const sql = `SELECT * FROM ${this.DB_TABLE_NAME}`
    console.log(sql)
    console.dir(this.db)
    const resultado = (await this.db.query(sql)).values       
    console.dir(resultado) 
    return resultado ?? []
  }

  async insertar(mostrado:Mostrado) {
    const sql = `INSERT INTO ${this.DB_TABLE_NAME}(${this.DB_COL_PROD}, ${this.DB_COL_COMP}, autor) VALUES(?,?,?)`
    await this.db.run(sql, [mostrado.nombre, mostrado.ver, mostrado.autor])
  }

  async actualizar(mostrado:Mostrado) {
    const sql = `UPDATE ${this.DB_TABLE_NAME} SET ${this.DB_COL_COMP} = ? WHERE ${this.DB_COL_ID} = ?`
    await this.db.run(sql, [mostrado.ver, mostrado.id])
  }

  async eliminar(id:number) {
    const sql = `DELETE FROM ${this.DB_TABLE_NAME} WHERE ${this.DB_COL_ID} = ?`
    await this.db.run(sql, [id])
  }

}
