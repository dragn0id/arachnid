export default function scrapeData() {
  let currentElements = [];
  const pageHandleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    alert(
      event.target.className ? event.target.className : event.target.tagName
    );
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
    event.target.style.border = "";
  };

  const pageHandleMouseOver = (event) => {
    event.target.style.border = "2px solid #f00";
  };

  document.querySelectorAll("*").forEach((el) => {
    el.style.outline = "1px dotted #808080";
    el.style.transition = "border 0s";
    el.addEventListener("mouseover", pageHandleMouseOver);
    el.addEventListener("mouseout", pageHandleMouseOut);
    el.addEventListener("click", pageHandleClick);
  });
}
