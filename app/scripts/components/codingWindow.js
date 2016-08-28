(function() {
  let codeMirrorInstances = [];

  /**
   * Boots up the component - gets called after the component
   * is added to the page via html imports
   */
  function setUpPage() {
    setUpCodeMirror();
    setUpRunButton();
  }

  /**
   * There's a play button to run the HTML/CSS/JS code provided by the user
   * This method attaches a click listener so we can actually execute their code
   */
  function setUpRunButton() {
    const playButton = document.querySelector('#runCode');
    playButton.addEventListener('click', () => {
      addCSSCode();
      addHTMLCode();
      addJSCode();
    });
  }

  /**
   * We keep an array of code mirror instances for html/css/js
   * This method returns the instance for a certain type (e.g. js)
   * @param  {String} id The id of the DOM element for the codemirror instance
   *                     e.g. javascriptCodeMirror
   * @return {Object}    The code mirror instance mapped to this ID
   */
  function findCorrespondingCodeMirrorInstance(id) {
    return codeMirrorInstances.find(codeMirrorInstance =>
      codeMirrorInstance.id === id).codeMirrorInstance;
  }

  /**
   * Grabs the JS code from code mirror and then adds it as an inline
   * script tag to the page so it can be executed. If the script tag
   * is already there, it deletes the old one.
   */
  function addJSCode() {
    const jsCode = findCorrespondingCodeMirrorInstance('javascriptCodeMirror');
    const existingScriptTag = document.querySelector('#userAddedJS');
    const newScriptTag = document.createElement('script');

    if (existingScriptTag) {
      existingScriptTag.remove();
    }

    newScriptTag.text = jsCode.getValue();
    document.body.appendChild(newScriptTag);
  }

  /**
   * Adds the CSS code to the page as an inline style block. If
   * there's already a pre-existing style tag, it replaces it.
   */
  function addCSSCode() {
    const cssCode = findCorrespondingCodeMirrorInstance('cssCodeMirror');
    const existingStyleTag = document.querySelector('#userAddedCSS');
    const newStyleTag = document.createElement('style');

    if (existingStyleTag) {
      existingStyleTag.remove();
    }

    newStyleTag.appendChild(document.createTextNode(cssCode.getValue()));
    document.body.appendChild(newStyleTag);
  }

  /**
   * Updates the HTML in the output area with what the user supplied.
   */
  function addHTMLCode() {
    const htmlCode = findCorrespondingCodeMirrorInstance('htmlCodeMirror');
    const outputEl = document.querySelector('#htmlOutput');
    outputEl.innerHTML = htmlCode.getValue();
  }

  /**
   * Replaces the three text areas (html/css/js code) with
   * code mirror instances
   */
  function setUpCodeMirror() {
    const selectorForTextAreas = '[data-code-mirror-text-area]';
    const textAreas = document.querySelectorAll(selectorForTextAreas);
    codeMirrorInstances = [].map.call(textAreas, codeMirrorTextArea => {
      const codeMirrorInstance = window.CodeMirror.fromTextArea(
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

  // give importWebComponents time to do html imports
  // todo: use mutation observer?
  setTimeout(setUpPage, 800);
})();
