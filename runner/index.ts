/**
 * @author Leviathenn
 */


import { exec } from "node:child_process";
import { WebSocket } from "ws";
import winston from "winston";
import fs from 'node:fs'
import process from "node:process";
  const { combine, timestamp, printf, colorize, align } = winston.format;
const logpath = '/tmp/runner.log';

const logger = winston.createLogger({
  level: 'info',
  format: combine(
     
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logpath,
      level: 'info',
      format: combine(
     
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    }),],
});

let host = JSON["parse"](fs["readFileSync"]("/runner/info.json")["toString"]())["host"];
let port = JSON["parse"](fs["readFileSync"]("/runner/info.json")["toString"]())["port"];
var ws = new WebSocket(`ws://${host}:${port}`);
ws.on('open', () => {
    logger.info(`Connected to runner server [ws://${host}:${port}]`);
    
    ws.send('Hello, server!');
  });
  
  ws.on('message', (message: string) => {
    let data = JSON.parse(message);
    if(data["action"] == "command"){
        let command = atob(data["command"]);
        exec(command, (err,stdout,stderr)=>{
          
            if(err){
                ws.send(JSON.stringify({"action":"stderr","program":data["program"],"stderr":stderr, "err": err}));
            }else{
               // console.log(stdout)
                logger.info(`Running program: "${data["program"]}". [FULL-COMMAND] "${data["program"]}"`);             
                ws.send(JSON.stringify({"action":"stdout","program":data["program"],"stdout":btoa(stdout)}));
            }
        })
    }
  });
  
  ws.on('close', () => {
    console.log('Disconnected from server');
  });
  
process.on('SIGINT',()=>{
  ws.send(JSON.stringify({"action":"log","file":btoa(fs.readFileSync(logpath).toString())}));
  process.exit(0);
})