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
