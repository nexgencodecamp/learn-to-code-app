import React from 'react';
import CodeMirror from '../../vendor/codemirror.min.js';

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
    // todo: should properly sandbox this
    this.addJSCode();
  }


  /**
   * Grabs the JS code from code mirror and then adds it as an inline
   * script tag to the page so it can be executed. If the script tag
   * is already there, it deletes the old one.
   */
  addJSCode() {
    const jsCode = this.findCorrespondingCodeMirrorInstance('javascriptCodeMirror');
    const existingScriptTag = document.querySelector('#userAddedJS');
    const newScriptTag = document.createElement('script');

    if (existingScriptTag) {
      existingScriptTag.remove();
    }

    newScriptTag.text = jsCode.getValue();
    document.body.appendChild(newScriptTag);
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
            <textarea id="javascriptCodeMirror" data-code-mirror-text-area className="hidden"></textarea>
          </div>
        </div>
        <button onClick={this.handleRunCode} id="runCode" className="mdl-button mdl-js-button mdl-button--raised vertical-center">
          <i className="material-icons">play_circle_filled</i> Run Code!
        </button>
        <div id="output">
          <h3>Output</h3>
          <output id="htmlOutput">
          </output>
        </div>
      </div>
    );
  }
}

export default CourseTableOfContentsComponent;
