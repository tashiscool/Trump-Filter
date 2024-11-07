// background.js

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "saveStats") {
    console.log("Storing stats...");
    console.log("Adding " + request.trumps + " Trumps to stats.");
    chrome.storage.sync.get({ trumps: 0, pages: 0 }, (items) => {
      chrome.storage.sync.set({
        trumps: items.trumps + request.trumps,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show action icon
    console.log("Putting badge on address bar.");
    chrome.action.enable(sender.tab.id);

    // Remove Google Analytics code as it's not supported in MV3

    sendResponse({});
  }
});
