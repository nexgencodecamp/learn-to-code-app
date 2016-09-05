// @flow

import React from 'react';
import CodeMirror from '../../vendor/codemirror.min.js';

class CodingWindowComponent extends React.Component {

  constructor() {
    super();
    this.handleRunCode = this.handleRunCode.bind(this);
    this.handleGoToNextSection = this.handleGoToNextSection.bind(this);
  }

  handleRunCode() {
    this.addJSCode();
  }

  handleGoToNextSection() {
    // todo
    const tickIcon = ' <i class="material-icons">done</i>';
    document.querySelector('#topic2').innerHTML += tickIcon;
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

  render() {
    this.setUpCodeMirror();

    return (
      <div class="mdl-layout__tab-panel" id="startCoding">
        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Course Content</span>
          <nav class="mdl-navigation">
            <span class="drawer-sub-title">Section One</span>
            <a class="mdl-navigation__link" href="">Topic 1
              <i class="material-icons">done</i>
            </a>
            <a class="mdl-navigation__link" href="" id="topic2">Topic 2</a>
            <a class="mdl-navigation__link" href="">Topic 3</a>
            <a class="mdl-navigation__link" href="">Topic 4</a>
          </nav>
        </div>
        <main class="mdl-layout__content">
          <div class="page-content">
            <div id="sectionContent">
              You are an ambassador to the planet Zorg, whose inhabitants can only understand English if it is entered through their translation engine, known as "console.log". Extend a warm greeting to the Zorglings. They'll be thrilled to hear from you!
            </div>
            <div class="mdl-grid">
              <div class="mdl-cell">
                <h3>Javascript</h3>
                <textarea id="javascriptCodeMirror" data-code-mirror-text-area class="hidden"></textarea>
              </div>
            </div>
            <button id="runCode" class="mdl-button mdl-js-button mdl-button--raised vertical-center">
              <i class="material-icons">play_circle_filled</i> Run Code!
            </button>
            <div id="output">
              <h3>Output</h3>
              <output id="htmlOutput">
              </output>
            </div>
            <button id="gotoNext" class="mdl-button mdl-js-button mdl-button--raised vertical-center">
              <i class="material-icons">check_circle</i> Goto Next
            </button>
          </div>
        </main>
      </div>
    );
  }
}

CodingWindowComponent.propTypes = {
  changeRoute: React.PropTypes.func
};

export default CodingWindowComponent;

