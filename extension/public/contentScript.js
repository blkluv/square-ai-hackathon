(async () => {
  console.log('run content script')
  const pageLoaded = () => {
    const buttonExists = document.getElementsByClassName("square-ext-btn")[0];
    console.log("we are in website");
    if (!buttonExists) {
      let ele = document.getElementsByClassName(
        "NavList align-left svelte-et1sru"
      );
      const button = document.createElement("button");
      button.textContent = "Open Popup";

      // Add a click event listener to open the extension's popup
      button.addEventListener('click', () => {
        // Communicate with the background script to open the extension popup.
        chrome.runtime.sendMessage({ openExtension: true });
      });
      

      // Find the squareup.com website's body element and append the button
      const body = document.querySelector("body");
      if (body) {
        ele[0].appendChild(button);
      }
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if(type === "TABUPDATED") {
      pageLoaded()
    }
  });

})();
