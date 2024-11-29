import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

let loadingWin, mainWin = null

function createLoadingWindow() {
  loadingWin = new BrowserWindow({
    width: 400, // 加载窗口宽度
    height: 300, // 加载窗口高度
    frame: false, // 无边框
    alwaysOnTop: true, // 窗口置顶
    transparent: true, // 窗口透明
    resizable: false, // 禁止缩放
    skipTaskbar: true, // 不在任务栏显示
    webPreferences: {
      devTools: false, // 禁用开发者工具
    },
  })

  loadingWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + "/loading")
}

function createMainWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({
    icon: 'public/image/chatgpt.ico',
    width: 1500,
    height: 900,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWin.once('ready-to-show', () => {
    if (loadingWin) loadingWin.close()
    mainWin.show()
  })

  mainWin.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWin.webContents.on('did-fail-load', (event, errorCode) => {
    if (errorCode != -3) {
      mainWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + "/error")
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  // mainWin.loadURL(process.env['ELECTRON_RENDERER_URL'])
  mainWin.loadURL("https://chat.openai.com/chat")
  // } else {
  // mainWin.loadFile(join(__dirname, '../renderer/index.html'))
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  // app.on('browser-window-created', (_, window) => {
  //   optimizer.watchWindowShortcuts(window)
  // })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createLoadingWindow()
  createMainWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
