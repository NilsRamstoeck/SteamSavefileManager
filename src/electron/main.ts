import * as path from 'path';
import { app, BrowserWindow, Menu, MenuItem, Tray } from 'electron';
import i18n from './i18next.config';
import { ipcMain } from 'electron/main';

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {

   // Create the browser window.
   const width = 300;
   const height = 500;
   const mainWindow = new BrowserWindow({
      width: isDev ? width + 400 : 0,
      height: height,
      maxWidth: isDev ? width + 400 : width,
      minWidth: width,
      minHeight: height,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         nodeIntegration: true,
      },
      titleBarStyle: 'hidden'
   });

   mainWindow.setMenu(null);

   // and load the index.html of the app.
   // win.loadFile("index.html");
   mainWindow.loadURL(
      isDev
         ? 'http://localhost:3000'
         : `file://${path.join(__dirname, '../src/index.html')}`
   );
   // Open the DevTools.
   if (isDev) {
      mainWindow.webContents.openDevTools();
   }
   return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(async () => {

   createWindow();

   const tray = new Tray(path.resolve(__dirname, '..', 'icons/floppy_disk.png'));
   const contextMenu = Menu.buildFromTemplate([
      { label: i18n.t('Exit'), type: 'normal', click: () => app.exit() }
   ])
   tray.setToolTip('Steam Savefile Manager')
   tray.setContextMenu(contextMenu)

   tray.on('click', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
   });

   app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
   });
});

ipcMain.on('close', (e) => {
   const window = BrowserWindow.fromWebContents(e.sender);
   window?.close();
})

ipcMain.on('minimize', (e) => {
   const window = BrowserWindow.fromWebContents(e.sender);
   window?.minimize();
})