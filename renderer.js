/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const fs = require('fs');

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
let subWin;
//弹出新窗口   window.open创建一个新窗口时会返回一个BrowserwindowProxy对象
function openWindow() {
  subWin = window.open('popup_page.html', 'baidu');
}
const openbtn = document.getElementById('openbtn');
openbtn.addEventListener('click', () => {
  openWindow();
});

function closeWindow() {
  subWin.close();
}

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
