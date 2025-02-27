import {app, ipcMain} from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Customer, NewCustomer } from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'

let dbPath;

if(process.platform === 'darwin') {
  dbPath = path.join(app.getPath('appData'), 'devclientes', 'devclients_db');
} else {
  dbPath = path.join(app.getPath('userData'), 'devclients_db');
};

const dbDir = path.dirname(dbPath);

if(!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, {recursive: true});
}

const db = new PouchDB<Customer>(dbPath);

async function addCustomer(customer: NewCustomer): Promise<PouchDB.Core.Response | void> {
  const id = randomUUID();

  const data: Customer = {
    ...customer,
    _id: id
  };

  return db.put(data)
  .then(resposne => resposne).catch(error => console.error("Erro ao cadastrar no banco de dados, ", error));

}

ipcMain.handle('add-customer', async(event, customer: Customer) => {
  const result = await addCustomer(customer);
  return result;
});