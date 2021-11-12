console.log('This is the background page.');
console.log('Put the background scripts here.');

console.log('Setting up the listener');
chrome.tabs.onActivated.addListener((tabId, changeInfo, tab) => {
  console.log(tabId, changeInfo, tab);
});