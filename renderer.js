// Renderer process code
// ...

// Example: Sending a message to the main process
const { ipcRenderer } = require('electron');

ipcRenderer.send('message', 'Hello from renderer process!');

ipcRenderer.on('reply', (event, arg) => {
  console.log(arg); // Log the reply from the main process
});

// ...
