const WebSocket = require('ws')
const express = require('express')
const app = express()
const path = require('path')

app.use('/',express.static(path.resolve(__dirname, '../client')))

const server = app.listen(9876)

const wss = new WebSocket.Server({
    port:9876
})

wss.on('connection', function(ws){
ws.on('message', function(data){
    wss.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(data);
        }
    })
  })
})
 