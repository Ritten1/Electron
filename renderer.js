/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const fs = require('fs');
// const aaa = require('electron');
// const { contextBridge } = require('electron');
const { dialog, globalShortcut } = require('@electron/remote');
const { ipcRenderer } = require('electron');

//可能会遇到dialog is undefined https://blog.csdn.net/qq_56423581/article/details/124785140

function getProcessInfo() {
  //   console.log('getCPUsage', process.getCPUUsage());
  console.log('env', process);
}

function onLoad() {
  document.getElementById('btn').addEventListener('click', getProcessInfo); //
  let btnClick = document.getElementById('btn'); // btnClick.onclick =
  getProcessInfo;
}

onLoad();

//发送信息给主进程
const sendmessage = document.getElementById('sendmessage');

sendmessage.addEventListener('click', () => {
  sendMessage();
});

function sendMessage() {
  ipcRenderer.send('send-message-to-main-test', '这是来渲染数据');
}
//监听主进程
ipcRenderer.on('send-message-to-render-test', (event, args) => {
  console.log(args, '渲染进程接收到的数据');
});

//注册热键
globalShortcut.register('CommandOrControl+x', () => {
  console.log('按下Ctrl+x');
});

//Dialog

// contextBridge.exposeInMainWorld('electronApi', {
//   dialog: require('electron').dialog,
//   showOpenDialog: require('electron').showOpenDialog,
// });

const opendialog = document.getElementById('opendialog');
const savedialog = document.getElementById('savedialog');
const showMessage = document.getElementById('showMessage');

function openDialog() {
  dialog
    .showOpenDialog({
      title: '选择喜欢的文件',
      buttonLabel: '保存',
      filters: [
        { name: 'Custom File Type', extensions: ['js', 'html', 'json '] },
      ],
    })
    .then((result) => {
      // filePaths用户选择的文件路径的数组. 如果对话框被取消，这将是一个空的数组
      console.log(result.filePaths, 'result');
    });
}
function saveDialog() {
  dialog
    .showOpenDialog({
      title: '选择要保存的文件',
      buttonLabel: '保存',
      filters: [
        { name: 'Custom File Type', extensions: ['js', 'html', 'json '] },
      ],
    })
    .then((result) => {
      console.log(result, 'result');
      fs.writeFileSync(result, '保存文件测试');
    });
}
function showMessageDialog() {
  dialog
    .showMessageBox({
      type: 'warning',
      title: '您确定嘛?',
      message: '您真的要删除这条数据吗',
      buttons: ['ok', 'cancel'],
    })
    .then((result) => {
      console.log(result, 'result');
      fs.writeFileSync(result, '保存文件测试');
    });
}

opendialog.addEventListener('click', () => {
  openDialog();
});

savedialog.addEventListener('click', () => {
  saveDialog();
});

showMessage.addEventListener('click', () => {
  showMessageDialog();
});

// let subWin;
// //弹出新窗口   window.open创建一个新窗口时会返回一个BrowserwindowProxy对象
// function openWindow() {
//   subWin = window.open('popup_page.html', 'baidu');
// }
// const openbtn = document.getElementById('openbtn');
// openbtn.addEventListener('click', () => {
//   openWindow();
// });

// function closeWindow() {
//   subWin.close();
// }

//关闭窗口
const closebtn = document.getElementById('closebtn');
closebtn.addEventListener('click', () => {
  closeWindow();
});

window.addEventListener('message', (msg) => {
  console.log('接收到的message', msg);
});

//webview实例
// const wb = document.querySelector('#wb');
// const loading = document.querySelector('#loading');
// wb.addEventListener('did-start-loading', () => {
//   console.log('did-start-loading');
//   loading.innerHTML = 'loading...';
// });
// wb.addEventListener('did-stop-loading', () => {
//   loading.innerHTML = 'ok';
//   console.log('did-stop-loading');
//   //可以增加css
//   wb.insertCSS(`
//     #su {
//       background:red !important;
//     }
//   `);
//   //执行js
//   wb.executeJavaScript(`
//   setTimeout(() => {
//     alert(document.querySelector('.index-logo-src').src);
//   }, 5000);
//   `);
//   //可以打开嵌入的webview的控制台
//   // wb.openDevTools();
// });

//File对象 实例
const dragWrapper = document.getElementById('drag');

dragWrapper.addEventListener('drop', (e) => {
  //   e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const path = files[0].path;
    console.log('path', path);
    const content = fs.readFileSync(path);
    console.log('content', content.toString());
  }
});
dragWrapper.addEventListener('dragover', (e) => {
  e.preventDefault();
});
