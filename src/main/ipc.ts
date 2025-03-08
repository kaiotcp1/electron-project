import  { app, ipcMain} from 'electron'

//Bidirecional
// ipcMain.handle('fetch-users', () => {
//   console.log('Buscando usuarios')

//   return [
//     {
//       id: 1,
//       name: 'John Doe'
//     },
//     {
//       id: 2,
//       name: 'John Doe 2'
//     }
//   ]
// })

ipcMain.handle('get-version', () => {
  return app.getVersion();
})

ipcMain.handle('get-versions-info', () => {
  return {
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
    v8: process.versions.v8
  };
});