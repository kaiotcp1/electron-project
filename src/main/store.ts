import {app, ipcMain} from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Customer, NewCustomer } from '../shared/types/ipc'

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