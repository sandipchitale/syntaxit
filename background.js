// function syntaxit(tabId, changeInfo, tab) {
// };
// Listen for any changes to the URL of any tab.
// chrome.tabs.onUpdated.addListener(syntaxit);

// Handle clicks on page action
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {
		syntaxit : true
	});
});
