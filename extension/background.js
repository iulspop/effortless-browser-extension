chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.goalSet === true) {
      chrome.storage.local.get(['goal'], (items) => {
        return items.goal;
      });
    }
  }
);
