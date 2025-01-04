// Native
import { join } from "path";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import { getRandomPort } from 'get-port-please';
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
const express = require('express');

app.commandLine.appendSwitch('ignore-gpu-blacklist'); // GPU のブラックリストを無視
app.commandLine.appendSwitch('ignore-gpu-blocklist');

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./src");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
      webgl: true, // enable webgl
      devTools: true, // enable devtools,
      sandbox: false,
    },
  });

  console.log(app.getGPUFeatureStatus());

  if (isDev) {
    mainWindow.loadURL("http://localhost:8000/");
    mainWindow.webContents.openDevTools();
  } else {
    const appExpress = express();
    appExpress.use(express.static(join(__dirname, '../src/out')));
    const appPort = await getRandomPort();
    appExpress.listen(appPort, '127.0.0.1', () => {
      console.log(`App Server is running at http://localhost:${appPort}`);
    });
    mainWindow.loadURL(`http://localhost:${appPort}/`);
    // @ts-ignore (define in dts)
    // mainWindow.webContents.openDevTools();
  }

});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
