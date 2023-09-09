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
      button.className = "square-ext-btn";

      button.addEventListener('click', () => {
        // Redirect to https://square-ai-hackathon.vercel.app/
        window.location.href = 'https://square-ai-hackathon.vercel.app/';
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
