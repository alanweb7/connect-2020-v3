import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Historico } from '../../models/historico.model';
import { SqliteHelperService } from '../sqlite-helper/sqlite-helper.service';


@Injectable()
export class HistoricoService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;


  constructor(
    public sqliteHelperService: SqliteHelperService,

  ) {}

  getDb(): Promise<SQLiteObject> {

    if (this.isFirstCall) {
      this.isFirstCall=false;
      return this.sqliteHelperService.getDb('cliente.db',this.isFirstCall)
        .then((db: SQLiteObject) => {

          this.db = db;

          this.db.executeSql
          ('CREATE TABLE IF NOT EXISTS historico (id INTEGER PRIMARY KEY AUTOINCREMENT,id_serv TEXT,code TEXT,titulo TEXT,img TEXT,card TEXT)', [])
            .then(success => console.log('Cliente table created successfully!', success))
            .catch((error: Error) => console.log('Error creating movie table!', error));

               return this.db;



        });


    }
    return this.sqliteHelperService.getDb();
  }

  getAll(){
    return this.getDb()
      .then((db: SQLiteObject) => {

        let history = this.db.executeSql('SELECT * FROM historico ;',[])
          .then(resultSet => {

            let list: Historico[] = [];

            for (let i = 0; i < resultSet.rows.length; i++) {
              list.push(resultSet.rows.item(i));
            }

            return list;
          }).catch((error: Error) => console.log('Error executing method getAll!', error));

          return history;

      });

  }

  create(hist: Historico){
    console.log('cadastro',hist.code,hist.img,hist.titulo);
    return this.db.executeSql('INSERT INTO historico (id_serv,code,titulo,img,card) VALUES (?,?,?,?,?)', [hist.id_serv,hist.code,hist.titulo,hist.img,hist.card])
      .then(resultSet => {
        hist.id = resultSet.insertId;
        return hist;
      }).catch((error: Error) => console.log(`Error creating '${hist.code}' movie!`, error));
  }

  update(titulo:String,img:String,code:String,card:String,id_serv:Number){
     console.log(titulo,img,code,card,id_serv);
    return this.db.executeSql('UPDATE historico SET code=?,titulo=?,img=?,card=? WHERE id_serv=?', [code,titulo,img,card,id_serv])
      .then(resultSet => resultSet.rowsAffected >= 0)
      .catch((error: Error) => console.log(`Error updating ${name} movie!`, error));
  }

  delete(id_serv: number){
    return this.db.executeSql('DELETE FROM historico WHERE id_serv=?', [id_serv])
      .then(resultSet => resultSet.rowsAffected > 0)
      .catch((resultSet =>-1));
  }

  getById(id_serv: Number){
    console.log('Buscar o id: ', id_serv);
    
    return this.db.executeSql('SELECT id_serv FROM historico WHERE id_serv=?', [id_serv])
      .then(resultSet =>
        ( resultSet.rows.item(0).id_serv))
      .catch((resultSet =>-1));
      
  }
  getByCode(code: String){
    return this.db.executeSql('SELECT * FROM historico WHERE code=?', [code])
      .then(resultSet => resultSet.rows.item(0))
      .catch((error: Error) => console.log(`Error fetching historico with token ${code}`, error));
  }

}
