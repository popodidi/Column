const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createWindow();


    setApplicationMenu();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function setApplicationMenu() {
    // Create the Application's main menu
    var Menu = electron.Menu;

    var template = [
        {
            label: "Application",
            submenu: [
                // { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                // { type: "separator" },
                {
                    label: "Quit", accelerator: "Command+Q", click: function () {
                    app.quit();
                }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                // { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                // { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                // { type: "separator" },
                {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
                {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
                {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
                {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            // on reload, start fresh and close any old
                            // open secondary windows
                            if (focusedWindow.id === 1) {
                                BrowserWindow.getAllWindows().forEach(function (win) {
                                    if (win.id > 1) {
                                        win.close()
                                    }
                                })
                            }
                            focusedWindow.reload()
                        }
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function () {
                        if (process.platform === 'darwin') {
                            return 'Ctrl+Command+F'
                        } else {
                            return 'F11'
                        }
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                        }
                    }
                }//,
                // {
                //     label: 'Toggle Developer Tools',
                //     accelerator: (function () {
                //         if (process.platform === 'darwin') {
                //             return 'Alt+Command+I'
                //         } else {
                //             return 'Ctrl+Shift+I'
                //         }
                //     })(),
                //     click: function (item, focusedWindow) {
                //         if (focusedWindow) {
                //             focusedWindow.toggleDevTools()
                //         }
                //     }
                // },
                // {
                //     type: 'separator'
                // },
                // {
                //     label: 'App Menu Demo',
                //     click: function (item, focusedWindow) {
                //         if (focusedWindow) {
                //             const options = {
                //                 type: 'info',
                //                 title: 'Application Menu Demo',
                //                 buttons: ['Ok'],
                //                 message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
                //             }
                //             electron.dialog.showMessageBox(focusedWindow, options, function () {
                //             })
                //         }
                //     }
                // }
            ]
        }, {
            label: 'Window',
            role: 'window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            }, {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }, {
                type: 'separator'
            }, {
                label: 'Reopen Window',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: function () {
                    app.emit('activate')
                }
            }]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1100, height: 700});

    // and load the index.html of the app.
    mainWindow.loadURL(path.join('file://', __dirname, './.build/index.html'));
    // mainWindow.loadURL(path.join('http://localhost:8080/'));

    // Open the DevTools.
    if (process.env.NODE_ENV == "development") {
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}
