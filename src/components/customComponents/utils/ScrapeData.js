export default function scrapeData() {
  function isBlockElement(element) {
    return window.getComputedStyle(element).display === "block";
  }

  // gets the direct text under an element, and the text of it's inline children
  function getInsideText(element) {
    let text = "";
    element.childNodes.forEach((child) => {
      // if child is a text node
      if (child.nodeType === 3) {
        text += child.textContent;
      }
      // if child is an inline element
      if (child.nodeType === 1 && !isBlockElement(child)) {
        text += getInsideText(child);
      }
    });
    return text;
  }

  const pageHandleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    alert(getInsideText(event.target) || event.target.href || event.target.src);

    document.querySelectorAll("*").forEach((el) => {
      el.style.outline = "";
      el.style.transition = "";
      el.removeEventListener("mouseover", pageHandleMouseOver);
      el.removeEventListener("mouseout", pageHandleMouseOut);
      el.removeEventListener("click", pageHandleClick);
    });
    event.target.style.border = "";
  };

  const pageHandleMouseOut = (event) => {
    event.stopPropagation();
    event.target.style.border = "";
    // document
    //   .querySelectorAll(className ? `${tagName}.${className}` : tagName)
    //   .forEach((el) => {
    //     el.style.border = "";
    //   });
  };

  const pageHandleMouseOver = (event) => {
    event.stopPropagation();
    event.target.style.border = "2px solid #f00";
    // let className = event.target.className;
    // let tagName = event.target.tagName;
    // document
    //   .querySelectorAll(className ? `${tagName}.${className}` : tagName)
    //   .forEach((el) => {
    //     el.style.border = "1px solid #0f0";
    //   });
  };

  document.querySelectorAll("*").forEach((el) => {
    // only elements with text content , href or src are scrapable
    if (
      getInsideText(el) !== "" ||
      el.href !== undefined ||
      el.src !== undefined
    ) {
      el.style.outline = "1px dotted #808080";
      el.style.transition = "border 0s";
      el.addEventListener("mouseover", pageHandleMouseOver);
      el.addEventListener("mouseout", pageHandleMouseOut);
      el.addEventListener("click", pageHandleClick);
    }
  });
}
