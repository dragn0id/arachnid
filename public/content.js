const arachnidCreateModal = () => {
  const modal = document.createElement("iframe");
  modal.src = chrome.runtime.getURL("index.html");
  console.log("created");
  document.body.appendChild(modal);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openModal") {
    arachnidCreateModal();
  }
});
