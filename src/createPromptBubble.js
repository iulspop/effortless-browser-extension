(function() {
  let bubble = (function() {
    let bubble = document.createElement("div");
    bubble.style.cssText = `
    width: 350px;
    height: 350px;
    padding: 50px;
    background-color: #FF91AF;
    border-radius: 50%;
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    z-index: 999;
    
    display: flex;
    flex-direction: column;
    
    font-family: sans-serif;
    text-align: center;
    `
    return bubble;
  })()

  let title = (function() {
    let title = document.createElement("p");
    title.textContent = "Set your intention.";
    return title;
  })()

  let form = (function() {
    let form = document.createElement("form");

    let item = (function() {
      let div = document.createElement("div");

      let label = (function() {
        let label = document.createElement("label");
        label.textContent = "What will you accomplish during this visit?";
        return label;
      })()
      let input = (function() {
        let input = document.createElement("input");
        return input;
      })()

      div.appendChild(label)
      div.appendChild(input)
      return div;
    })()

    let item2 = (function() {
      let div = document.createElement("div");

      let label = (function() {
        let label = document.createElement("label");
        label.textContent = "After what time will you exit?";
        return label;
      })()
      let input = (function() {
        let input = document.createElement("input");
        return input;
      })()

      div.appendChild(label)
      div.appendChild(input)
      return div;
    })()

    form.appendChild(item)
    form.appendChild(item2)
    return form;
  })()

  bubble.appendChild(title);
  bubble.appendChild(form);

  document.body.appendChild(bubble);
})()