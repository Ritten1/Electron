// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  BrowserView,
  globalShortcut,
  ipcMain,
  Menu,
} = require('electron');

const path = require('path');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame:false,//无边框，一般做一些提示性的窗口
    show: false,
    enableRemoteModule: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, //用户的require和process等变量的使用需要事先设定上这个属性
      webviewTag: true,
      contextIsolation: false,
    },
  });
  require('@electron/remote/main').initialize(); //初始化
  require('@electron/remote/main').enable(mainWindow.webContents); //初始化
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('did-finish-load');
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  const view = new BrowserView();

  view.setBounds({
    x: 10,
    y: 10,
    width: 300,
    height: 200,
  });
  // view.webContents.loadURL('https://www.baidu.com');
  // mainWindow.setBrowserView(view);

  //此方法已不存在
  // setTimeout(() => {
  //   view.destroy();
  // }, [5000]);

  // mainWindow.on('closed', function () {
  //   mainWindow = null;
  // });
  mainWindow.once('ready-to-show', function () {
    console.log(view, 'viewview');
    mainWindow.show();
  });

  //主动跟渲染进程说话
  setTimeout(() => {
    mainWindow.webContents.send(
      'send-message-to-render-test',
      '我也是主进程，主动向渲染进程发消息'
    );
  }, 5000);

  // 主进程很少有需求  弹出菜单
  // setTimeout(() => {
  //   const template = [
  //     { label: '第一个菜单项目' },
  //     { label: '第二个菜单项目' },
  //     { role: 'undo' },
  //     { type: 'separator' },
  //     { label: '第三个菜单项目' },
  //     { label: '第四个菜单项目' },
  //   ];
  //   const menu = Menu.buildFromTemplate(template);

  //   Menu.setApplicationMenu(menu);
  //   menu.popup();
  // }, 5000);

  // childWin = new BrowserWindow({
  //   parent: mainWindow,
  //   modal: true,
  //   x: 0,
  //   y: 0,
  // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  //注册快捷键
  globalShortcut.register('CommandOrControl+l', () => {
    console.log('按下Ctrl+L');
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, e xcept on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  //解绑所有热键
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('send-message-to-main-test', (event, args) => {
  console.log('主进程接收到的数据是：', args);
  //发送到渲染进程
  event.reply('send-message-to-render-test', '来自于主进程的问候');
});
