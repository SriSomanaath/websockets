const url = `ws://localhost:9876/websocket`
const server = new WebSocket(url);

const messages = document.getElementById('messages')
const message = document.getElementById('message')
const button = document.getElementById('send')

button.disabled = true
button.addEventListener('click', sendMessage, false)

server.onopen = function(){
    button.disabled = true
}

function sendMessage(){
    const text = input.value
    server.send(text)
}

