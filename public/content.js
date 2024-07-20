const arachnidCreateModal = () => {
  // check if modal is created
  if (document.getElementById("arachnidModal")) return;
  const modal = document.createElement("iframe");
  modal.id = "arachnidModal";
  modal.src = chrome.runtime.getURL("index.html");
  modal.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
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
