const { contextBridge, ipcRenderer } = require('electron');

// Updater API
contextBridge.exposeInMainWorld('updaterAPI', {
  noUpdateAvailable: (callback) => ipcRenderer.on('update-not-available', callback),
  updateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  updateDownloading: (callback) => ipcRenderer.on('update-download-progress', callback),
  updateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback)
});

// Window API
contextBridge.exposeInMainWorld('windowAPI', {
  windowReduce: () => ipcRenderer.invoke('windowReduce'),
  windowClose: () => ipcRenderer.invoke('windowClose'),
});

// App API
contextBridge.exposeInMainWorld('appApi', {
  appMainFormIsReady: (response) => ipcRenderer.on('appMainFormIsReady', (response)),
  appExit: (response) => ipcRenderer.on('appMainFormIsReady', (response)),
  readyForUpdate: () => ipcRenderer.invoke('readyForUpdate'),
  getAppVersion: () => ipcRenderer.invoke('getAppVersion'),
  noSettingsFile: (response) => ipcRenderer.on('noSettingsFile', (response)),
  updateSettings: (response) => ipcRenderer.on('updateSettings', (response)),
  saveSettings: (args) => ipcRenderer.invoke('saveSettings', args)
});
