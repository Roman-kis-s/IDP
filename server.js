const http = require('http');
const {spawn} = require('child_process');

const PORT = 3000;

let processId = null;

http.createServer((request, response) => {
    // if (request.headers['access-control-request-method'] === 'DELETE') {
    //     killCommand(processId);
    // }
    if (request.method === 'POST') {
        let body = '';

        request.on('data', (chunk) => body += chunk.toString());
        request.on('end', () => {
            console.log(body);
            const commandName = body.slice(body.indexOf('=') + 1, body.indexOf('&'));
            const command = body.slice(body.lastIndexOf('=') + 1);

            console.log(commandName, command);
            const child = spawn(commandName, [command]);
            processId = child.pid;


            child.stdout.pipe(response);
            // child.stdout.on('data', (chunk) => {
            //     console.log(chunk.toString());
            //     response.write(child.send(chunk + '<br>'));
            // });
            //
            // child.stderr.on('data', (chunk) => {
            //     console.log(chunk.toString());
            //     response.end(chunk);
            // });
            //
            // child.on('close', () => {
            //     response.end();
            //     console.log('Command terminated');
            // });
        });
    }

}).listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);

function killCommand(id) {
    if (id) {
        process.kill(id);
        processId = null;
    }
}
