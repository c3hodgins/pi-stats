const express = require('express')
const app = express()
const os = require('os')
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const wsport = 8080;

const wsocket = new WebSocket.Server({ port: wsport })

function getCpuTemp() {
    try {
        const tempPath = '/sys/class/thermal/thermal_zone0/temp';
        const tempInMilliDegrees = fs.readFileSync(tempPath, 'utf8').trim();
        const tempInCelsius = parseFloat(tempInMilliDegrees) / 1000;
        return tempInCelsius.toFixed(1); // returns temperature in degrees Celsius
    } catch (error) {
        console.error('Error reading CPU temperature:', error);
        return null;
    }
};

function getCpuUsage() {
    const cpus = os.cpus();
    return cpus.map((cpu) => {
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
        const usage = 100 - (100 * cpu.times.idle) / total;
        return usage.toFixed(1);
    });
}

function getStorage() {
    exec('df -h', (error, stdout, stderr) => {
        if (error) {
            console.error('exec error: ' + error);
            reject(error); // Reject the promise if there's an error
        }
        console.log(stdout)
        return stdout;
    });
};

app.get('/api/general', async (request, response) => {
    const general = {
        platform: os.platform(),
        hostname: os.hostname(),
        user: os.userInfo(),
    };
    response.json(general)

})

app.get('/api/cpu', async (request, response) => {
    const cpu_data = {
        cpus: os.cpus().length,
    };
    response.json(cpu_data)

})

app.get('/api/mem', async (request, response) => {
    const mem_data = {
        total: os.totalmem(),
        free: os.freemem()
    };
})

wsocket.on('connection', (ws) => {
    console.log("Connected");
    ws.on('message', (message) => {
        const request = JSON.parse(message);

        setInterval(() => {
            if (request.type == 'cpu') {
                ws.send(JSON.stringify({
                    "cpuTemp": getCpuTemp(),
                    "cpuUsage": getCpuUsage()
                }));
            } else if (request.type == 'mem') {
                ws.send(JSON.stringify({
                    "total": os.totalmem(),
                    "free": os.freemem()
                }));
            }
        }, 2000);
    })
    ws.on('close', () => {
        console.log('client disconnected');
    });
});

console.log('Websocket server started at port: ' + 'http://localhost:' + wsport);

app.listen(5000, () => { console.log("Server started on port 5000") })
