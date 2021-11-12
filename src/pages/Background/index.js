console.log('This is the background page.');
console.log('Put the background scripts here.');

const data = {};

console.log('Fetching deal data.');

fetch('http://localhost:8080/api/deals/stats')
  .then((data) => data.json())
  .then((deals) => (data.deals = deals));

console.log('Setting up the listener');

chrome.tabs.onActivated.addListener((tabId) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const { url } = tabs[0];
    const { host } = new URL(url);
    if (
      data.deals.some(({ retailer_domains }) =>
        retailer_domains.some((domain) => host.includes(domain))
      )
    ) {
      chrome.runtime.sendMessage({ showBanner: true });
    } else {
      chrome.runtime.sendMessage({ showBanner: false });
    }
  });
});
