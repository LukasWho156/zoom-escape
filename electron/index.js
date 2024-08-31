const { app, BrowserWindow } = require('electron/main');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 528,
    height: 624
  })

  win.setMenu(null);
  win.resizable = false;
  win.loadFile('../dist/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})