const { contextBridge, ipcRenderer } = require('electron');

// Window API
contextBridge.exposeInMainWorld('windowAPI', {
  windowReduce: () => ipcRenderer.invoke('windowReduce'),
  windowClose: () => ipcRenderer.invoke('windowClose'),
});

// App API
contextBridge.exposeInMainWorld('appApi', {
  appMainFormIsReady: (response) => ipcRenderer.on('appMainFormIsReady', (response)),
  appExit: (response) => ipcRenderer.on('appMainFormIsReady', (response)),
  getAppVersion: () => ipcRenderer.invoke('getAppVersion'),
  noSettingsFile: (response) => ipcRenderer.on('noSettingsFile', (response)),
  updateSettings: (response) => ipcRenderer.on('updateSettings', (response)),
  saveSettings: (args) => ipcRenderer.invoke('saveSettings', args)
});

// Data Dragon API
contextBridge.exposeInMainWorld('ddragonApi', {
  getJsonFromUrl: (args) => ipcRenderer.invoke('getJsonFromUrl', args),
  getImageB64FromUrl: (args) => ipcRenderer.invoke('getImageB64FromUrl', args)
});
