export default function getDataFromElements() {
  console.log("Scraping data from elements");
  const elements = window.ArachnidElementArray;
  console.log("in scrapedata.js, window: ", window.ArachnidElementArray);

  function getDataFromSingleElement(element) {
    // for a single element, add text of all inline children, recursively call for all block childre
    let elementData = {};
    if (element.src !== undefined) {
      elementData[`src_${element.tagName}.${element.classList}`] = element.src;
    }
    if (element.href !== undefined && element.href !== "javascript:void(0)") {
      elementData[`href_${element.tagName}.${element.classList}`] =
        element.href;
    }
    if (element.childNodes.length === 0 && element.textContent.trim() !== "") {
      let key = `${element.parentNode.tagName}.${element.parentNode.classList}`;
      if (!elementData[key]) {
        elementData[key] = "";
      }
      elementData[key] = element?.textContent;
    } else {
      element.childNodes.forEach((child) => {
        elementData = { ...elementData, ...getDataFromSingleElement(child) };
      });
    }
    return elementData;
  }

  let data = [];
  elements.forEach((element) => {
    data.push(getDataFromSingleElement(element));
  });

  const allKeys = new Set();
  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => allKeys.add(key));
  });

  const scrapedData = data.map((obj) => {
    const newObj = { ...obj };
    allKeys.forEach((key) => {
      if (!(key in obj)) {
        newObj[key] = null;
      }
    });
    return newObj;
  });

  console.log("Scraped data: ", JSON.stringify(scrapedData));

  chrome.runtime.sendMessage({
    action: "dataScraped",
    data: JSON.stringify(scrapedData),
  });
}
