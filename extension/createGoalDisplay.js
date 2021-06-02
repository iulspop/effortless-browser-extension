function fetch_storage(keys) {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, items => resolve(items))
  })
};

(async function() {
  const goal = await fetch_storage(['goal']).then(items => items.goal);

  let goalDisplayBubble = (function() {
    let goalDisplayBubble = document.createElement("div");
    goalDisplayBubble.style.cssText = `
      width: 120px;
      height: 60px;
      padding: 0;
      background-color: #FF91AF;
      border-radius: 7%;

      position: fixed;
      left: 20px;
      top: 20px;
      z-index: 999999999999;
    `
    return goalDisplayBubble;
  })()

  let goalDescription = (function() {
    let goalDescription = document.createElement("p");
    goalDescription.style.cssText = `
      font-family: sans-serif;
      font-size: 20px;
      text-align: center;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `
    goalDescription.textContent = `${goal}`;
    return goalDescription;
  })()

  goalDisplayBubble.appendChild(goalDescription);

  document.body.appendChild(goalDisplayBubble);
})()