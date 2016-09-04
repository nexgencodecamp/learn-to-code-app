export default function waitForComponentToLoad() {
  return new Promise(resolve => {
    const target = document.querySelector('main');
    const componentsAlreadyLoaded = target.innerHTML.trim() !== '';
    if (componentsAlreadyLoaded) {
      resolve();
    }

    const mutationObserver = new MutationObserver(() => {
      mutationObserver.disconnect();
      resolve();
    });
    const config = {attributes: true, childList: true, characterData: true};

    // pass in the target node, as well as the observer options
    mutationObserver.observe(target, config);
  });
}
