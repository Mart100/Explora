let $ = require('jquery')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

function createWindow() {
  let win = new BrowserWindow({
    width: 1000, 
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  win.webContents.openDevTools()

  win.loadFile('index.html')

  win.on('closed', () => { win = null })
}

app.on('ready', createWindow)

