import sandboxEval from '../../utils/sandboxEval';

/**
* Prepares action payload when code has finished executing
* @param  {Object} value  The payload value
* @return {Object} The action payload
*/
function executedCode(value) {
  debugger;
  return {
    type: 'EXECUTED_CODE',
    value,
  };
}

/**
* Prepares action payload when code has started executing
* @return {Object} The action payload
*/
function executingCode() {
  return {
    type: 'EXECUTING_CODE',
    value: {
      status: 'EXECUTING CODE',
    },
  };
}

export default {
  executeCode(codeToExecute, expectedResult) {
    // use thunk so we can handle the async save to zoho crm
    return function doAsyncDispatch(dispatch) {
      dispatch(executingCode());
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
