import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const SLEEK_ID = 'sleek-banner';

const openPopup = () => {
  chrome.tabs.create({ url: 'popup.html' });
};

const addBanner = () => {
  const banner = document.createElement('div');

  banner.id = SLEEK_ID;

  banner.style.position = 'fixed';
  banner.style.top = '10px';
  banner.style.right = '10px';
  banner.style.width = '200px';
  banner.style.height = '150px';
  banner.style.display = 'flex';
  banner.style.flexDirection = 'column';
  banner.style.justifyContent = 'space-around';
  banner.style.alignItems = 'center';
  banner.style.backgroundColor = '#fff';

  const text = document.createElement('p');
  text.style.marginTop = '20px';
  text.style.color = '#111';
  text.innerText = 'You have a Sleek deal ready!';

  const button = document.createElement('button');
  button.onclick = openPopup;
  button.innerText = 'Open Sleek';

  banner.append(text);
  banner.append(button);

  document.body.append(banner);
};

const removeBanner = () => {
  const banner = document.querySelector(`#${SLEEK_ID}`);

  if (banner) banner.remove();
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender);
  if (!sender.tab && request.showBanner) {
    addBanner();
  } else {
    removeBanner();
  }
});
