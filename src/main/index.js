import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import * as settings from 'electron-settings'
import icon from '../../resources/icon.png?asset'

let mainWindow
let leagueData = {
  champions: {},
  runes: {
    main: {},
    stats: [
      {
        runes: [
          {
            key: 'AdaptiveForce',
            name: 'Force adaptative',
            icon: 'perk-images/StatMods/StatModsAdaptiveForceIcon.png'
          },
          {
            key: 'AttackSpeed',
            name: "Vitesse d'attaque",
            icon: 'perk-images/StatMods/StatModsAttackSpeedIcon.png'
          },
          {
            key: 'CDRScaling',
            name: 'Accélération de compétences',
            icon: 'perk-images/StatMods/StatModsCDRScalingIcon.png'
          }
        ]
      },
      {
        runes: [
          {
            key: 'AdaptiveForce',
            name: 'Force adaptative',
            icon: 'perk-images/StatMods/StatModsAdaptiveForceIcon.png'
          },
          {
            key: 'MovementSpeed',
            name: 'Vitesse de déplacement',
            icon: 'perk-images/StatMods/StatModsMovementSpeedIcon.png'
          },
          {
            key: 'HealthPlus',
            name: 'PV croissants',
            icon: 'perk-images/StatMods/StatModsHealthPlusIcon.png'
          }
        ]
      },
      {
        runes: [
          {
            key: 'HealthScaling',
            name: 'Points de vie',
            icon: 'perk-images/StatMods/StatModsHealthScalingIcon.png'
          },
          {
            key: 'Tenacity',
            name: 'Ténacité et résistance aux ralentissements',
            icon: 'perk-images/StatMods/StatModsTenacityIcon.png'
          },
          {
            key: 'HealthPlus',
            name: 'PV croissants',
            icon: 'perk-images/StatMods/StatModsHealthPlusIcon.png'
          }
        ]
      }
    ]
  },
  items: {},
  summoners: {}
}

function initSettings() {
  if (!settings.has('soundEnabled')) settings.set('soundEnabled', true)
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    maxWidth: 1280,
    maxHeight: 720,
    show: false,
    titleBarStyle: 'hidden',
    frame: false,
    center: true,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('dev.noxelis')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  autoUpdater.setFeedURL({
    provider: 'github',
    repo: 'LoL_UltimateBraveryTournament',
    owner: 'noxelisdev',
    private: false,
    releaseType: 'release'
  })
  autoUpdater.forceDevUpdateConfig = true
  autoUpdater
    .on('update-not-available', (m) => {
      mainWindow.webContents.send('update-not-available', m)
    })
    .on('update-available', (m) => {
      mainWindow.webContents.send('update-available', m)
    })
    .on('download-progress', (m) => {
      mainWindow.webContents.send('update-download-progress', m)
    })
    .on('update-downloaded', (m) => {
      mainWindow.webContents.send('update-downloaded', m)

      setTimeout(() => {
        autoUpdater.quitAndInstall()
      }, 3000)
    })

  ipcMain.on('windowReduce', () => {
    mainWindow.minimize()
  })

  ipcMain.on('windowClose', () => {
    app.exit()
  })

  ipcMain.handle('settings', async (_, { method, key, value }) => {
    switch (method) {
      case 'has':
        return settings.has(key)
      case 'get':
        return settings.get(key)
      case 'set':
        settings.set(key, value)
        return true
      case 'reset':
        settings.reset()
        return true
      case 'delete':
        settings.unset(key)
        return true
      default:
        throw new Error('Unknown method: ' + method)
    }
  })

  ipcMain.handle('getAppVersion', () => {
    return app.getVersion()
  })

  ipcMain.handle('getLeagueData', (event, type) => {
    if (type === 'champions') {
      return leagueData.champions
    } else if (type === 'runes') {
      return leagueData.runes
    } else if (type === 'items') {
      return leagueData.items
    } else if (type === 'summoners') {
      return leagueData.summoners
    }

    return leagueData
  })

  ipcMain.handle('storeLeagueData', (event, type, data) => {
    if (type === 'champions') {
      leagueData.champions = data
    } else if (type === 'runes') {
      leagueData.runes.main = data
    } else if (type === 'items') {
      leagueData.items = data
    } else if (type === 'summoners') {
      leagueData.summoners = data
    } else {
      leagueData = data
    }
  })

  ipcMain.handle('retrieveData', async (event, url) => {
    return await fetch(url).then((res) => res.json())
  })

  initSettings()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  autoUpdater.checkForUpdatesAndNotify()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
