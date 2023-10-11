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
    data.text().then(messageText => {
        const newMessage = document.createElement('div');
        newMessage.innerText = `Server says: ${messageText}`;
        const res = document.getElementById('res');
        res.appendChild(newMessage);
    });
}

function sendMessage(){
    const text = input.value; // Corrected variable name
    server.send(text);
}
