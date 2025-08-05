import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  noUpdateAvailable: (callback) => ipcRenderer.on('update-not-available', callback),
  updateAvailable: (callback) => ipcRenderer.on('update-available', callback),
  updateDownloading: (callback) => ipcRenderer.on('update-download-progress', callback),
  updateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback),
  getAppVersion: () => ipcRenderer.invoke('getAppVersion'),
  retrieveData: (url) => ipcRenderer.invoke('retrieveData', url)
}

const league = {
  getData: (type) => ipcRenderer.invoke('getLeagueData', type),
  storeData: (type, data) => ipcRenderer.invoke('storeLeagueData', type, data)
}

const settings = {
  has: (key) => ipcRenderer.invoke('settings', { method: 'has', key }),
  get: (key) => ipcRenderer.invoke('settings', { method: 'get', key }),
  set: (key, value) => ipcRenderer.invoke('settings', { method: 'set', key, value }),
  reset: (key) => ipcRenderer.invoke('settings', { method: 'reset', key }),
  delete: (key) => ipcRenderer.invoke('settings', { method: 'delete', key })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('league', league)
    contextBridge.exposeInMainWorld('settings', settings)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.league = league
  window.settings = settings
}
