const MAX_EXECUTION_TIME = 2000;

/**
* Runs untrustworthy code inside a webworker and returns the result.
* Guards against infinite loops by having a
* @param  {String}  untrustedCode  The code we'll try running
* @return  {Promise}  Promise that resolves after the code has executed
    (or fails if the code takes too long or results in an error)
*/
export default function safeEval(untrustedCode) {
  return new Promise(function(resolve, reject) {
      const worker = new Worker('/scripts/vendor/safeEval.js');

      worker.onmessage = function(e) {
          worker.terminate();
          resolve(e.data);
      };

      worker.onerror = function(e) {
          reject(new Error(e.message));
      };

      worker.postMessage(untrustedCode);

      setTimeout(function() {
          worker.terminate();
          reject(new Error('The code took too long to execute. ' +
            'Make sure you don\'t have an infinite loop!'));
      }, MAX_EXECUTION_TIME);
  });
}
