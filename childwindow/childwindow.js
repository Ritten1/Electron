function sendMessageToParent() {
  window.opener.postMessage('这是来自子窗口的问候');
}

const sendbtn = document.getElementById('sendbtn');
sendbtn.addEventListener('click', () => {
  sendMessageToParent();
});
