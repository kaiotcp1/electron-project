import  { ipcMain} from 'electron'

//Bidirecional
ipcMain.handle('fetch-users', () => {
  console.log('Buscando usuarios')

  return [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'John Doe 2'
    }
  ]
})