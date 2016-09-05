/**
 * Adds components to appropriate place on page
 */
function importWebComponents() {
  const components = [
    {
      idOfImportLink: 'component-header',
      destination: '#container',
      operation: 'prepend'
    },
    {
      idOfImportLink: 'component-reactContainer',
      destination: '#content'
    },
    {
      idOfImportLink: 'component-about',
      destination: '#content'
    },
    {
      idOfImportLink: 'component-footer',
      destination: '#content'
    }
  ];
  components.forEach(importAndInsertComponent);
}

/**
 * Completes the HTML import by pulling in the data
 * from the HTML import link and then adding it to the page
 * in the specified location
 * @param  {Object} data An object with structure
 * {
 *   idOfImportLink: the ID of the link element for the HTML import
 *   destination: the selector for the element where the component will be added
 *   operation: append/prepend (defaults to append)
 * }
 */
function importAndInsertComponent(data) {
  const importLinkEl = document.getElementById(data.idOfImportLink);
  const importedComponent = importLinkEl.import;
  const componentElements = importedComponent.body.childNodes || [];
  const destination = document.querySelector(data.destination);

  componentElements.forEach(componentEl => {
    insertElement(componentEl, destination, data.operation);
  });
}

/**
 * Inserts the element in the specified location
 * @param  {DOMElement} elementToInsert The component to insert
 * @param  {DOMElement} destination     The destination element
 * @param  {String} operation       Either append or prepend
 */
function insertElement(elementToInsert, destination, operation) {
  if (operation === 'prepend') {
    destination.insertBefore(elementToInsert, destination.childNodes[0]);
  } else {
    destination.appendChild(elementToInsert);
  }
}

importWebComponents();
