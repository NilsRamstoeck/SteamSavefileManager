import { app, contextBridge } from "electron"
import { ipcRenderer } from "electron/renderer"

contextBridge.exposeInMainWorld('i18n', {
})

contextBridge.exposeInMainWorld('IPC', {
    close: () => ipcRenderer.send('close'),
    minimize: () => ipcRenderer.send('minimize'),
})