const path = require("path");
const url = require("url");
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1440,
        height: 900,
        icon: path.join(__dirname, 'img/icon.png'),
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'render.js')
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));


    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});