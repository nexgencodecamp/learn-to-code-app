export default (function() {
  this.listeners = [];

  function hideAllOtherComponents() {
    const tabs = document.querySelectorAll('.mdl-layout__tab-panel');
    [].forEach.call(tabs, tab => {
      tab.style.display = 'none';
      tab.classList.remove('is-active');
    });
  }

  function showActiveComponent() {
    const newActiveComponentID = window.location.hash.split('/')[0];
    const newActiveComponent = document.querySelector(newActiveComponentID);
    newActiveComponent.style.display = '';
    newActiveComponent.classList.add('is-active');

    if (newActiveComponent.querySelector('.mdl-layout__drawer')) {
      addDrawer();
    }
  }

  function notifyEventListeners() {
    const newActiveComponent = window.location.hash.split('/')[0];
    const extraParams = window.location.hash.split('/')[1];
    this.listeners.forEach(listener => {
      if (listener.prefix === newActiveComponent) {
        listener.callback(extraParams);
      }
    });
  }

  function removeDrawer() {
    const container = document.querySelector('#container');
    container.classList.remove('mdl-layout--fixed-drawer');
  }

  function addDrawer() {
    const container = document.querySelector('#container');
    container.classList.add('mdl-layout--fixed-drawer');
  }

  function subscribeToURLChanges(prefix, callback) {
    this.listeners.push({
      prefix,
      callback
    });
  }

  window.addEventListener('hashchange', () => {
    removeDrawer();
    hideAllOtherComponents();
    showActiveComponent();
    notifyEventListeners();
  });

  return {
    subscribeToURLChanges
  };
})();
