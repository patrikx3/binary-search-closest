const worker = async (options) => {
    const { Worker } = require('worker_threads');
    const workerResult = await new Promise((resolve, reject) => {
        const worker = new Worker(`${__dirname}/worker.js`, {
            workerData: options
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
            worker.terminate()
        });
    });
    return workerResult
};

module.exports.worker = worker
