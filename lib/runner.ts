/**
 * @author Leviathenn
 * @note typescript is better
 */

import { WebSocketServer } from "ws";
import * as ip from "ip";
import * as fs from "fs";
type callbackFunction = (a: WebSocket) => void;
type nnMessage = (a:string) => void;
export class runner{
    private wss: WebSocketServer;
  
    private ws!: WebSocket;
    constructor(callback:callbackFunction){ 
        function randomIntFromInterval(min:number, max:number) {
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
          let port = randomIntFromInterval(1000,99999)
          this.wss = new WebSocketServer({host: ip.address(),port: port});
          const wss: WebSocketServer = this.wss;
          fs.writeFileSync("info.json",JSON.stringify({"host":ip.address(),port:port}))
          
          wss.on('connection', (ws: WebSocket) => {
              console.log('New client connected');
              this.ws = ws;
              callback(ws);  
                //client.send(JSON.stringify({"action":"command","program":"whoami","command":btoa("whoami")}));
                
              ws.on('message', (message: string) => {
                console.log(`Received message: ${message}`);
                
              });
            
              ws.on('close', () => {
                console.log('Client disconnected');
              });
            });
   
    }
    send(command: string,name:string){
        this.ws.send(JSON.stringify({"action":"command","program":name,"command":btoa(command)}));
    };
  
    install(){
        
    }
}