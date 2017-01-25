import React from 'react';
import { connect } from 'react-redux';
import CodeMirror from '../../vendor/codemirror.min';
import ExecuteCodeActions from '../actionCreators/executeCode.js';
import './css/jsSandbox.css';

/**
* This component contains a code editor into which
* the user can enter code to solve the challenge.
* User input is run in a sandboxed webworker and
* results shown to the user afterwards.
*/
class JavascriptSandboxComponent extends React.Component {

  /**
   * Bind events so they work with onClick/onKeyPress
   **/
  constructor() {
    super();
    this.handleRunCode = this.handleRunCode.bind(this);
  }

  /**
   *  Triggered after component has mounted.
   *  Need to wait until DOM hooks are ready before setting
   *  up CodeMirror.
   */
  componentDidMount() {
    this.setUpCodeMirror();
  }

  /**
   * Replaces the three text areas (html/css/js code) with
   * code mirror instances
   */
  setUpCodeMirror() {
    const selectorForTextAreas = '[data-code-mirror-text-area]';
    const textAreas = document.querySelectorAll(selectorForTextAreas);
    this.codeMirrorInstances = [].map.call(textAreas, (codeMirrorTextArea) => {
      const codeMirrorInstance = CodeMirror.fromTextArea(
        codeMirrorTextArea,
        {
          lineNumbers: true,
        }
      );

      return {
        codeMirrorInstance,
        id: codeMirrorTextArea.id,
      };
    });
  }

  /**
   *  Triggered when the user clicks the Run Code button.
   */
  handleRunCode() {
    const jsCode = this.getCodeFromCodeMirror();
    this.props.executeCode(jsCode, this.props.expectedResult);
  }

  /**
   *  @return  {String}  The code that the user entered
   **/
  getCodeFromCodeMirror() {
    return this.getCodeMirrorInstance('javascriptCodeMirror').getValue();
  }

  /**
   * We keep an array of code mirror instances for html/css/js
   * This method returns the instance for a certain type (e.g. js)
   * @param  {String} id The id of the DOM element for the codemirror instance
   *                     e.g. javascriptCodeMirror
   * @return {Object}    The code mirror instance mapped to this ID
   */
  getCodeMirrorInstance(id) {
    return this.codeMirrorInstances.find((codeMirrorInstance) =>
      codeMirrorInstance.id === id).codeMirrorInstance;
  }

  /**
   * Renders the component using CSS modules for styling.
   * @return {JSX}  JSX
   */
  render() {
    const executionOutput = this.props.codeExecutionResult.output || '';
    const executionResult = this.props.codeExecutionResult.correctStatus;
    let rightOrWrong;
    if (this.props.codeExecutionResult.executed) {
      rightOrWrong = 'Result: ' +
          (executionResult ? 'CORRECT!' : 'OOPS TRY AGAIN :(');
    }
    return (
      <div>
        <div className="mdl-grid" styleName="no-padding">
          <div className="mdl-cell" styleName="no-margin">
            <h3>Javascript</h3>
            <span>Make sure you include return on the last line</span>
            <textarea id="javascriptCodeMirror"
              data-code-mirror-text-area
              className="hidden"
            >
            </textarea>
          </div>
        </div>
        <button
          onClick={this.handleRunCode}
          id="runCode"
          className="mdl-button mdl-js-button
            mdl-button--raised vertical-center"
          styleName="margin-bottom-sm"
        >
          <i className="material-icons">play_circle_filled</i> Run Code!
        </button>

        <div id="outputWrapper" className={rightOrWrong ? '' : 'hidden'}>
          <h3 styleName="no-margin-bottom">{rightOrWrong}</h3>
          <h3 styleName="no-margin-bottom">Output</h3>
          <output id="jsOutput">
          {executionOutput}
          </output>
        </div>
      </div>
    );
  }
}

/**
*  Maps action creators to props.
*  @param  {Function}  dispatch - the Redux event dispatcher method
*  @return  {Object}  Action creator methods that should be added to props.
*/
function mapDispatchToProps(dispatch) {
  return {
    executeCode(userInput, expectedResult) {
      dispatch(ExecuteCodeActions.executeCode(userInput, expectedResult));
    },
  };
}

/**
*  Maps Redux store state to props
*  @param  {Object}  state - the Redux state
*  @return  {Object}  props based on Redux state
*/
function mapStateToProps(state) {
  return {
    codeExecutionResult: state.codeExecutionResult,
  };
}

const connecter = connect(mapStateToProps, mapDispatchToProps);
export default connecter(JavascriptSandboxComponent);
