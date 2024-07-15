export default function selectData() {
  function getElementsOfScrapableData(target) {
    /**
     * This algorithm identifies all scrapable data associated with a given target element (where a mouse click occurred).
     * We start with all elements that have the same tag and class as the target element.
     * Recursively call the function with the parents of the candidate elements.
     * Continue this process until the target's ancestor shares the same parent with at least another candidate element.
     * The elements that share the same parent are identified as the scrapable data, all other elements are discarded.
     **/
    function helper(candidateSet) {
      let parentSet = new Set();
      for (let candidate of candidateSet) {
        // if a common parent exists and it contains the target
        if (
          parentSet.has(candidate.parentNode) &&
          candidate.parentNode.contains(target)
        ) {
          // handles elements with multiple classes are correctly matched
          const classList = Array.from(candidate.classList)
            .map((cls) => `.${cls}`)
            .join("");

          const selector = classList
            ? `${candidate.tagName}${classList}`
            : candidate.tagName;

          // return all candidates that is the ancestor of the same class of the target element
          return candidate.parentNode.querySelectorAll(selector);
        } else parentSet.add(candidate.parentNode);
      }
      return helper(parentSet);
    }
    let className = target.className;
    let tagName = target.tagName;

    // Split the class names by space and joins them with dots to form a proper query selector
    let candidateElements = document.querySelectorAll(
      className ? `${tagName}.${className.split(" ").join(".")}` : tagName
    );
    return helper(new Set(candidateElements));
  }

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
    //TODO: this is a temporary fix of this annoying bug. Proper bug fix needed
    if (
      getInsideText(event.target) === "" &&
      event.target.src === undefined &&
      event.target.href === undefined
    ) {
      event.target.removeEventListener("click", pageHandleClick);
    }
    event.preventDefault();
    event.stopPropagation();
    const elementArray = getElementsOfScrapableData(event.target);

    elementArray.forEach((element) => {
      // coloring the targets green
      element.style.border = "2px solid #0f0";
    });

    window.ArachnidElementArray = elementArray;
    console.log("window from select data: ", window.ArachnidElementArray);

    chrome.runtime.sendMessage({
      action: "elementSelected",
    });

    document.querySelectorAll("*").forEach((el) => {
      el.style.outline = "";
      el.style.transition = "";
      el.removeEventListener("mouseover", pageHandleMouseOver);
      el.removeEventListener("mouseout", pageHandleMouseOut);
      el.removeEventListener("click", pageHandleClick);
    });
    // fix issue where selected element not highlighted
    // event.target.style.border = "";
  };

  const pageHandleMouseOut = (event) => {
    //TODO: this is a temporary fix of this annoying bug. Proper bug fix needed
    if (
      getInsideText(event.target) === "" &&
      event.target.src === undefined &&
      event.target.href === undefined
    ) {
      event.target.removeEventListener("mouseout", pageHandleMouseOut);
    }
    event.stopPropagation();
    event.target.style.border = "";
  };

  const pageHandleMouseOver = (event) => {
    //TODO: this is a temporary fix of this annoying bug. Proper bug fix needed
    if (
      getInsideText(event.target) === "" &&
      event.target.src === undefined &&
      event.target.href === undefined
    ) {
      event.target.removeEventListener("mouseover", pageHandleMouseOver);
    }
    event.stopPropagation();
    event.target.style.border = "2px solid #f00";
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
  // return data;
}
