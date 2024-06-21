import { UpArrowIcon } from "../../svgFunctions/AllSvgFunctions";
import InspectElementLogo1 from "../../../assets/images/InspectElement1.svg";
import { useState } from "react";
import CheckBoxTick from "../CustomCheckBoxes/CheckBox1/CheckBoxTick/CheckBoxTick";
import "./DynamicScrapingSection.css";

export default function DynamicScrapingSection() {
  const [isUsingDynamicScraper, setIsUsingDynamicScraper] = useState(false);
  const [showPaginationMore, setShowPaginationMore] = useState(true);
  const [showLoadmoreMore, setShowLoadmoreMore] = useState(true);

  function handleIsUsingDynamicScraperClick(checked) {
    setIsUsingDynamicScraper(checked);
    console.log("Checkbox is checked:", checked);
  }

  function handleMorePaginationClick() {
    setShowPaginationMore(!showPaginationMore);
  }

  function handleMoreLoadmoreClick() {
    setShowLoadmoreMore(!showLoadmoreMore);
  }

  return (
    <>
      <div className="border-y border-t-white border-b-slate-500 p-2 w-full flex justify-between items-center">
        <h2 className="text-white text-base font-semibold ">
          DYNAMIC SCRAPING
        </h2>
        <div className="scale-50">
          <CheckBoxTick onCheckboxChange={handleIsUsingDynamicScraperClick} />
        </div>
      </div>
      <div
        className={`pl-6 space-y-8 slide-transition ${
          isUsingDynamicScraper ? "slide-down1" : "slide-up"
        } `}
      >
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="pagination"
                name="options"
                value="pagination"
                className="w-8 h-8"
              />
              <label htmlFor="pagination" className="text-sm">
                Pagination
              </label>
            </div>
            <button
              size="icon"
              className={`${
                showPaginationMore ? "" : "rotate-180"
              } transition-transform`}
              onClick={handleMorePaginationClick}
            >
              <UpArrowIcon />
            </button>
          </div>
          <div
            className={`space-y-4 slide-transition ${
              showPaginationMore ? "slide-down2" : "slide-up"
            }`}
          >
            <p className="text-xs ml-10 text-gray-400">
              Use pagination if the content you wish to scrape is over multiple
              pages
            </p>
            <div className="flex items-center space-x-4">
              <button className="ml-10 bg-[#D9D9D940] p-2 rounded-md">
                <img src={InspectElementLogo1} alt="InspectElementLogo1" />
              </button>
              <label htmlFor="nextPage" className="text-sm">
                Select &quot;Next Page&quot; Button
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="loadMore"
                name="options"
                value="loadMore"
                className="w-8 h-8"
              />
              <label htmlFor="loadMore" className="text-sm">
                Load More
              </label>
            </div>
            <button
              className={`${
                showLoadmoreMore ? "" : "rotate-180"
              } transition-transform`}
              onClick={handleMoreLoadmoreClick}
            >
              <UpArrowIcon />
            </button>
          </div>
          <div
            className={`space-y-4 slide-transition ${
              showLoadmoreMore ? "slide-down2" : "slide-up"
            } `}
          >
            <p className="text-xs ml-10 text-gray-400">
              Use the load more feature if the content you wish to scrape is
              dynamically loaded with a Load More button
            </p>
            <div className="flex items-center space-x-4">
              <button className="ml-10 bg-[#D9D9D940] p-2 rounded-md">
                <img src={InspectElementLogo1} alt="InspectElementLogo1" />
              </button>
              <label htmlFor="nextPage" className="text-sm">
                Select &quot;Load More&quot; Button
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
