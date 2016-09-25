import React from 'react';
import CodeMirror from '../../vendor/codemirror.min';
import sandboxEval from '../../utils/sandboxEval';

class CourseTableOfContentsComponent extends React.Component {

  constructor() {
    super();
    this.handleRunCode = this.handleRunCode.bind(this);
  }

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
    this.codeMirrorInstances = [].map.call(textAreas, codeMirrorTextArea => {
      const codeMirrorInstance = CodeMirror.fromTextArea(
        codeMirrorTextArea,
        {
          lineNumbers: true
        }
      );

      return {
        codeMirrorInstance,
        id: codeMirrorTextArea.id
      };
    });
  }

  handleRunCode() {
    const jsCode = this.findCorrespondingCodeMirrorInstance('javascriptCodeMirror').getValue();
    sandboxEval(jsCode)
      .then(execResult => {
        // todo - not the right way to do this
        document.querySelector('#jsOutput').innerHTML = execResult;
      })
      .catch(error => {
        document.querySelector('#jsOutput').innerHTML = error;
      });
  }

  /**
   * We keep an array of code mirror instances for html/css/js
   * This method returns the instance for a certain type (e.g. js)
   * @param  {String} id The id of the DOM element for the codemirror instance
   *                     e.g. javascriptCodeMirror
   * @return {Object}    The code mirror instance mapped to this ID
   */
  findCorrespondingCodeMirrorInstance(id) {
    return this.codeMirrorInstances.find(codeMirrorInstance =>
      codeMirrorInstance.id === id).codeMirrorInstance;
  }

  render() {
    return (
      <div>
        <div className="mdl-grid">
          <div className="mdl-cell">
            <h3>Javascript</h3>
            <span>Make sure you include return on the last line</span>
            <textarea id="javascriptCodeMirror" data-code-mirror-text-area className="hidden"></textarea>
          </div>
        </div>
        <button onClick={this.handleRunCode} id="runCode" className="mdl-button mdl-js-button mdl-button--raised vertical-center">
          <i className="material-icons">play_circle_filled</i> Run Code!
        </button>

        <div id="outputWrapper">
          <h3>Output</h3>
          <output id="jsOutput">
          </output>
        </div>
      </div>
    );
  }
}

export default CourseTableOfContentsComponent;
