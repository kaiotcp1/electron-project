import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Customer, NewCustomer } from '../shared/types/ipc';

declare global {
  export interface Window{
    electron: ElectronAPI
    api: typeof api
  }
};

// Custom APIs for renderer
const api = {
  onNewClient: (callback: () => void) => {
    ipcRenderer.on('register-client', callback);

    return () => {
      ipcRenderer.off('register-client', callback);
    }
  },
  fetchUsers: () => {
    //INVOKE => enviar e receber.
    return  ipcRenderer.invoke('fetch-users')
  },

  addCustomer: (customer: NewCustomer): Promise<PouchDB.Core.Response | void> => ipcRenderer.invoke('add-customer', customer),

  fetchAllCustomers: (): Promise<Customer[]> => ipcRenderer.invoke('fetch-all-customers'),

  fetchCustomerById: (id: string): Promise<Customer | null> => ipcRenderer.invoke('fetch-customer-by-id', id),

  deleteCustomer: (id: string): Promise<PouchDB.Core.Response | null> => ipcRenderer.invoke('delete-customer', id)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
