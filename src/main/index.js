import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

let loadingWin, mainWin = null

// 创建加载窗口
function createLoadingWindow() {
  loadingWin = new BrowserWindow({
    width: 400, // 加载窗口宽度
    height: 300, // 加载窗口高度
    frame: false, // 无边框
    alwaysOnTop: true, // 窗口始终在最前
    transparent: true, // 窗口透明
    resizable: false, // 禁止缩放
    skipTaskbar: true, // 不在任务栏显示
    webPreferences: {
      devTools: false, // 禁用开发者工具
    },
  })

  // 开发环境下加载开发地址，生产环境加载打包后的页面
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loadingWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/loading')
  } else {
    loadingWin.loadFile(join(__dirname, '../renderer/index.html'), { hash: '#/loading' })
  }
}

// 创建主窗口
function createMainWindow() {
  // 创建主窗口
  mainWin = new BrowserWindow({
    icon: 'public/image/chatgpt.ico',
    width: 1500,
    height: 900,
    show: false, // 窗口初始时不显示
    autoHideMenuBar: true, // 自动隐藏菜单栏
    ...(process.platform === 'linux' ? { icon } : {}), // Linux 系统下设置图标
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // 预加载脚本
      sandbox: false, // 禁用沙盒
    }
  })

  // 加载外部 URL
  mainWin.loadURL("https://chat.openai.com/chat")

  // 窗口准备显示时，关闭加载窗口
  mainWin.once('ready-to-show', () => {
    if (loadingWin) {
      loadingWin.close() // 关闭加载窗口
      loadingWin = null
    }
    mainWin.show() // 显示主窗口
  })

  // 拦截窗口打开链接，使用默认浏览器打开
  mainWin.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' } // 阻止窗口打开
  })

  // 加载失败时处理
  mainWin.webContents.on('did-fail-load', (event, errorCode) => {
    if (errorCode != -3) { // -3 是由于用户取消加载时的错误码，忽略
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/error')
      } else {
        mainWin.loadFile(join(__dirname, '../renderer/index.html'), { hash: '#/error' })
      }
    }
  })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用该方法
app.whenReady().then(() => {
  // 设置 Windows 系统下应用的用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // 监听重试事件
  ipcMain.on('retry', () => {
    // 关闭主窗口并重新创建加载窗口和主窗口
    if (mainWin) {
      mainWin.close()
      mainWin = null
    }

    createLoadingWindow()
    createMainWindow()
  })

  // 创建加载窗口和主窗口
  createLoadingWindow()
  createMainWindow()

  // macOS 下点击 dock 图标时，如果没有打开窗口，则重新创建主窗口
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// 当所有窗口都关闭时退出应用，macOS 下除外
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
