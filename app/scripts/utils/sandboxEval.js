export default function safeEval(untrustedCode) {
    return new Promise(function (resolve, reject) {
        var worker = new Worker('/scripts/vendor/safeEval.js');

        worker.onmessage = function (e) {
            worker.terminate();
            resolve(e.data);
        };

        worker.onerror = function (e) {
            reject(new Error(e.message));
        };

        worker.postMessage(untrustedCode);

        setTimeout(function () {
            worker.terminate();
            reject(new Error('The code took too long to execute. Make sure you don\'t have an infinite loop!'));
        }, 2000);
    });
}
