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

async function fetchAllCustomers(): Promise<Customer[]> {
  try {
      const result = await db.allDocs({include_docs: true});
      return result.rows.map(row => row.doc as Customer);
  } catch (error) {
    console.log('Erro ao buscar os clientes', error);
    return []
  }
}

ipcMain.handle('fetch-all-customers', async() => {
  return await fetchAllCustomers();
})

async function fetchCustomerById(id: string) {
  return db.get(id)
  .then(customer => customer)
  .catch(error => {console.error('Erro ao buscar cliente por id', error)
    return null
  });
}

ipcMain.handle('fetch-customer-by-id', async(event, id: string) => {
  const response = await fetchCustomerById(id);
  return response;
});

async function deleteCustomer(id: string) {
  try {
    const doc = await db.get(id);
    const response = await db.remove(doc._id, doc._rev);
    return response;
  } catch (error) {
    console.log('Erro ao deletar cliente', error);
    return null;
  }
}

ipcMain.handle('delete-customer', async(event, id: string) => {
  return await deleteCustomer(id);
});