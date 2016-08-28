(function() {

    let codeMirrorInstances = [];

    function setUpPage() {
        setUpCodeMirror();
        setUpPlayButton();
    }

    function setUpPlayButton() {
        const playButton = document.querySelector('#runCode');
        playButton.addEventListener('click', () => {
            addCSSCode();
            addHTMLCode();
            addJSCode();
        });
    }

    function findCorrespondingCodeMirrorInstance(id) {
        return codeMirrorInstances.find(codeMirrorInstance => 
            codeMirrorInstance.id === id).codeMirrorInstance;
    }

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

    function addHTMLCode() {
        const htmlCode = findCorrespondingCodeMirrorInstance('htmlCodeMirror');
        const outputEl = document.querySelector('#htmlOutput');
        outputEl.innerHTML = htmlCode.getValue();
    }

    function setUpCodeMirror() {  
        const codeMirrorTextAreas = document.querySelectorAll('[data-code-mirror-text-area]');
        codeMirrorInstances = [].map.call(codeMirrorTextAreas, (codeMirrorTextArea) => {  
            const codeMirrorInstance = window.CodeMirror.fromTextArea(codeMirrorTextArea, {
                lineNumbers: true
            });

            return {
                codeMirrorInstance,
                id: codeMirrorTextArea.id
            };
        });
    }

    setTimeout(setUpPage, 800);
})();
