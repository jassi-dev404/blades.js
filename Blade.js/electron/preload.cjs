const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Add any IPC methods you need here
  // Example: send: (channel, data) => ipcRenderer.send(channel, data),
  // Example: receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
