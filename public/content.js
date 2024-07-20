const arachnidCreateModal = () => {
  // check if modal is created
  if (document.getElementById("arachnidModal")) return;
  document.body.style.marginRight = "400px";
  document.body.style.position = "relative";
  const modal = document.createElement("iframe");
  modal.id = "arachnidModal";
  modal.src = chrome.runtime.getURL("index.html");
  modal.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      border: none;
      box-shadow: -2px 0 5px rgba(128, 128, 128, 0.3);
      z-index: 10000;
      width: 400px;
    `;
  document.body.appendChild(modal);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openModal") {
    arachnidCreateModal();
  }
});
