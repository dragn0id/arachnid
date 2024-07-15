export default function scrapeData() {
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
          // Converts the class list into an array, prefixes each class with a dot, and joins them into a single string
          // This ensures that elements with multiple classes are correctly matched
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

  let data = {};

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

    let elementArray = getElementsOfScrapableData(event.target);

    elementArray.forEach((element) => {
      element.style.border = "2px solid #0f0";
    });

    console.log("elementArray", elementArray);

    // data = getDataFromIdArray(idArray);

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
    // document
    //   .querySelectorAll(className ? `${tagName}.${className}` : tagName)
    //   .forEach((el) => {
    //     el.style.border = "";
    //   });
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

    // elementArray = getElementsOfScrapableData(event.target);
    // let className = event.target.className;
    // let tagName = event.target.tagName;
    // document
    //   .querySelectorAll(className ? `${tagName}.${className}` : tagName)
    //   .forEach((el) => {
    //     el.style.border = "1px solid #0f0";
    // });
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
