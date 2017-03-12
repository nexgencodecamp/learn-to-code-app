import sandboxEval from '../../utils/sandboxEval';
import { isEqual } from 'lodash';

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

/**
* Triggered when the user has supplied the correct answer
* either based on the sandbox result or the input matching
* expectedInput.
* @param  {Function}  dispatch  Redux dispatch function
* @param {*} execResult  The execution result from the sandbox
        (or the input if expectedInput was supplied)
*/
function handleCorrectAnswer(dispatch, execResult) {
  dispatch(executedCode({
    correctStatus: true,
    output: execResult,
    executed: true,
  }));
}


/**
* Triggered when the user has supplied an incorrect answer
* either based on the sandbox result or the input matching
* expectedInput.
* @param  {Function}  dispatch  Redux dispatch function
* @param {*} execResult  The execution result from the sandbox
        (or the input if expectedInput was supplied)
*/
function handleIncorrectAnswer(dispatch, execResult) {
  dispatch(executedCode({
    correctStatus: false,
    output: execResult,
    executed: true,
  }));
}

export default {
  executeCode(codeToExecute, expectedResult, expectedInput) {
    // use thunk so we can handle the async save to zoho crm
    return function doAsyncDispatch(dispatch) {
      dispatch(executingCode(codeToExecute));

      if (expectedInput) {
        if (isEqual(codeToExecute, expectedInput)) {
          handleCorrectAnswer(dispatch, codeToExecute);
        } else {
          handleIncorrectAnswer(dispatch, codeToExecute);
        }
      } else {
        sandboxEval(codeToExecute)
          .then((execResult) => {
            if (isEqual(execResult, expectedResult)) {
              handleCorrectAnswer(dispatch, execResult);
            } else {
              handleIncorrectAnswer(dispatch, execResult);
            }
          })
          .catch((e) => {
            dispatch(executedCode({
              correctStatus: false,
              output: e.message,
              executed: true,
            }));
          });
      }
    };
  },
};
