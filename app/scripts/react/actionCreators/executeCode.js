import sandboxEval from '../../utils/sandboxEval';

/**
* Prepares action payload when code has finished executing
* @param  {Object} value  The payload value
* @return {Object} The action payload
*/
function executedCode(value) {
  return {
    type: 'EXECUTED_CODE',
    value,
  };
}

/**
* Prepares action payload when code has started executing
* @param  {Object} codeToExecute  The code to execute
* @return {Object} The action payload
*/
function executingCode(codeToExecute) {
  return {
    type: 'EXECUTING_CODE',
    value: {
      status: 'EXECUTING CODE',
      codeToExecute,
    },
  };
}

export default {
  executeCode(codeToExecute, expectedResult) {
    // use thunk so we can handle the async save to zoho crm
    return function doAsyncDispatch(dispatch) {
      dispatch(executingCode(codeToExecute));
      sandboxEval(codeToExecute)
        .then((execResult) => {
          if (execResult === expectedResult) {
            dispatch(executedCode({
              correctStatus: true,
              output: execResult,
              executed: true,
            }));
          } else {
            dispatch(executedCode({
              correctStatus: false,
              output: execResult,
              executed: true,
            }));
          }
        })
        .catch((e) => {
          dispatch(executedCode({
            correctStatus: false,
            output: e.message,
            executed: true,
          }));
        });
    };
  },
};
