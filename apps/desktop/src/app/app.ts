import { join } from 'node:path';
import { format } from 'node:url';
import { app, BrowserWindow, screen, shell } from 'electron';
import { environment } from '../environments/environment';
import { rendererAppName, rendererAppPort } from './constants';

export default class App {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  static mainWindow: Electron.BrowserWindow | null;
  static application: Electron.App;
  static BrowserWindow = BrowserWindow;

  public static isDevelopmentMode() {
    const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnvironment: boolean = parseInt(process.env.ELECTRON_IS_DEV ?? '0', 10) === 1;

    return isEnvironmentSet ? getFromEnvironment : !environment.production;
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      App.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    App.mainWindow = null;
  }

  private static onRedirect(event: any, url: string) {
    if (App.mainWindow && url !== App.mainWindow.webContents.getURL()) {
      // this is a normal external redirect, open it in a new browser window
      event.preventDefault();
      shell.openExternal(url);
    }
  }

  private static onReady() {
    // Handle single instance for deep links
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit();
      return;
    }

    // Register deep link protocol
    if (process.defaultApp) {
      if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('codo-ing', process.execPath, [join(__dirname, '..')]);
      }
    } else {
      app.setAsDefaultProtocolClient('codo-ing');
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    if (rendererAppName) {
      App.initMainWindow();

      // Check for initial deep link from command line arguments
      const deepLinkUrl = process.argv.find((arg) => arg.startsWith('codo-ing://'));
      if (deepLinkUrl) {
        App.handleDeepLink(deepLinkUrl);
      } else {
        App.loadMainWindow();
      }
    }
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (App.mainWindow === null) {
      App.onReady();
    }
  }

  private static initMainWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = Math.min(1280, workAreaSize.width || 1280);
    const height = Math.min(720, workAreaSize.height || 720);

    // Create the browser window.
    App.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      show: false,
      webPreferences: {
        contextIsolation: true,
        backgroundThrottling: false,
        preload: join(__dirname, 'main.preload.js'),
      },
    });
    App.mainWindow.setMenu(null);
    App.mainWindow.center();

    // Open dev tools in development
    if (!App.application.isPackaged) {
      App.mainWindow.webContents.openDevTools();
    }

    // if main window is ready to show, close the splash window and show the main window
    App.mainWindow.once('ready-to-show', () => {
      App.mainWindow?.show();
    });

    // handle all external redirects in a new browser window
    App.mainWindow.webContents.on('will-navigate', App.onRedirect);

    // Emitted when the window is closed.
    App.mainWindow.on('closed', App.onClose);
  }

  private static handleDeepLink(url: string) {
    if (App.mainWindow) {
      if (App.mainWindow.isMinimized()) App.mainWindow.restore();
      App.mainWindow.focus();

      // Extract the path from the protocol URL
      const urlPath = url.replace('codo-ing://', '');

      if (App.application.isPackaged) {
        const webUrl = `file://${join(__dirname, '..', rendererAppName, 'index.html')}#/${urlPath}`;
        App.mainWindow.loadURL(webUrl);
      } else {
        // In development, load the URL with the path
        const devUrl = `http://localhost:${rendererAppPort}/${urlPath}`;
        App.mainWindow.loadURL(devUrl);
      }
    }
  }

  private static loadMainWindow() {
    // load the index.html of the app.
    if (!App.application.isPackaged) {
      App.mainWindow?.loadURL(`http://localhost:${rendererAppPort}`);
    } else {
      App.mainWindow?.loadURL(
        format({
          pathname: join(__dirname, '..', rendererAppName, 'index.html'),
          protocol: 'file:',
          slashes: true,
        }),
      );
    }
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for

    App.BrowserWindow = browserWindow;
    App.application = app;

    App.application.on('window-all-closed', App.onWindowAllClosed); // Quit when all windows are closed.
    App.application.on('ready', App.onReady); // App is ready to load data
    App.application.on('activate', App.onActivate); // App is activated

    // Handle deep links
    App.application.on('open-url', (event, url) => {
      event.preventDefault();
      App.handleDeepLink(url);
    });

    // Handle deep links on Windows/Linux
    App.application.on('second-instance', (event, commandLine, workingDirectory) => {
      const url = commandLine.find((arg) => arg.startsWith('codo-ing://'));
      if (url) {
        App.handleDeepLink(url);
      }
    });
  }
}
