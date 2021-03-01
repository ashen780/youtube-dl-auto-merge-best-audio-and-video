const fs = require('fs');
const { spawn } = require('child_process');
const videoPath = '../youtube-dl';
const audioPath = '../youtube-dl audio';
const savePath = '../youtube-dl';

const files = fs.readdirSync('../youtube-dl/');

async function Main() {
    for (const file of files) {
        let name = file;
        let finel_name = file.split('.').slice(0, -1).join('.') + '.mp4';
        let isExcist = fs.existsSync(`${savePath}/${finel_name}`);
        let extention = file.split('.').pop();

        if (extention == 'webm' && !isExcist) {
            console.log(extention == 'webm', !isExcist);
            let command = `ffmpeg -i "${videoPath}/${name}" -i "${audioPath}/${name}" -c:v copy -c:a aac "${savePath}/${finel_name}"`;
            let output = await runComand(command);
            console.log(output);
        } else {
            console.log("skip");
        }
    }
}



async function runComand(command) {

    return new Promise(resolve => {

        const ls = spawn('CMD', ['/c', command], { windowsVerbatimArguments: true });

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            printProgress(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve('resolved');
        });

    });



}


function printProgress(progress) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress + '%');
}

Main();

