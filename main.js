const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let mainWindow;

// Set the log level
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Check for updates when the app is ready
app.on('ready', () => {
  createWindow();

  // Check for updates
  autoUpdater.checkForUpdates();

  // Listen for update available event
  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available');
  });

  // Listen for update downloaded event
  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
  });

  // Listen for error event
  autoUpdater.on('error', (error) => {
    log.error('Error occurred during update:', error.message);
  });
});

// Rest of your code...
