chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("checking listener");
  console.log("tab url" + tab.url);
  if (tab.url && tab.url.includes("squareup.com")) {
    chrome.tabs.sendMessage(tabId, {
      type: "TABUPDATED",
    });
  }
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setPopup({
    popup: "index.html"
    });
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.openExtension) {
    // Open the extension popup.
    chrome.action.openPopup();
  }
});
