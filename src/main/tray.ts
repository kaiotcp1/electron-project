import {Menu, Tray, nativeImage, BrowserWindow} from 'electron';
import path from 'node:path';

export function createTray(window: BrowserWindow) {
  const appIcon = path.join(__dirname, 'resources', 'menuTemplate.png');
  let icon = nativeImage.createFromPath(appIcon);
  
  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    {label: 'Dev Clientes', enabled: false},
    {type: 'separator'},
    {label: 'Register client', 
      click: () => {
        window.webContents.send('register-client');
        if(window.isMinimized()) window.restore();
        window.focus();
      }
    },
    {label: 'Close', click: () => window.close()}
  ])

  tray.setToolTip('Dev Clientes');
  tray.setTitle('Dev Clientes');
  tray.setContextMenu(menu);
};