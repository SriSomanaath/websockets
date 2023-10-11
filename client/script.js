const url = `ws://localhost:9876/websocket`;
const server = new WebSocket(url);

const messages = document.getElementById('messages');
const input = document.getElementById('message'); // Corrected variable name
const button = document.getElementById('send');

button.disabled = true;
button.addEventListener('click', sendMessage, false);

server.onopen = function(){
    button.disabled = false; // Change to false to enable the button when the connection is open
};

server.onmessage = function(event) {
    const { data } = event;
    if (data instanceof Blob) {
        generateMessageEntry(data, 'Server');
    } else if (typeof data === 'string') {
        generateMessageEntry(data, 'Server');
    } else {
        // Handle other data types or log an error.
    }
}

function generateMessageEntry(msg, type) {
    if (msg instanceof Blob) {
        msg.text().then(messageText => {
            const newMessage = document.createElement('div');
            newMessage.innerText = `${type} says: ${messageText}`;
            const res = document.getElementById('res');
            res.appendChild(newMessage);
        });
    } else if (typeof msg === 'string') {
        const newMessage = document.createElement('div');
        newMessage.innerText = `${type} says: ${msg}`;
        const res = document.getElementById('res');
        res.appendChild(newMessage);
    }
}


function sendMessage(){
    const text = input.value;
    generateMessageEntry(text, 'Client')
    server.send(text);
}
