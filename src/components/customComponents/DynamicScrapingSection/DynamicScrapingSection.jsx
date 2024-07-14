import InspectElementLogo1 from "../../../assets/images/InspectElement1.svg";
import { useState } from "react";
import CheckBoxTick from "../CustomCheckBoxes/CheckBox1/CheckBoxTick/CheckBoxTick";
import "./DynamicScrapingSection.css";
import CheckBoxCross from "../CustomCheckBoxes/CheckBox1/CheckBoxCross/CheckBoxCross";

export default function DynamicScrapingSection() {
  const [isUsingDynamicScraper, setIsUsingDynamicScraper] = useState(false);
  const [showPaginationMore, setShowPaginationMore] = useState(false);
  const [showLoadmoreMore, setShowLoadmoreMore] = useState(false);

  function handleIsUsingDynamicScraperClick(checked) {
    setIsUsingDynamicScraper(checked);
    setShowPaginationMore(false);
    setShowLoadmoreMore(false);
  }

  function handleMorePaginationClick(checked) {
    setShowPaginationMore(checked);
    setShowLoadmoreMore(!checked);
  }

  function handleMoreLoadmoreClick(checked) {
    setShowLoadmoreMore(checked);
    setShowPaginationMore(!checked);
  }

  return (
    <>
      <div
        className={`relative transition-all p-2 w-full flex justify-between items-center ${
          !isUsingDynamicScraper
            ? "border-y border-t-slate-500 border-b-slate-800"
            : "border-y border-t-white border-b-slate-500"
        }`}
      >
        <h2
          className={`text-white text-base font-semibold ${
            !isUsingDynamicScraper ? "opacity-50" : ""
          }`}
        >
          DYNAMIC SCRAPING
        </h2>
        <div className="scale-50">
          <div
            className={`absolute -top-6 right-2 transition-all ${
              !isUsingDynamicScraper
                ? ""
                : showLoadmoreMore || showPaginationMore
                ? "opacity-0"
                : ""
            } `}
          >
            <CheckBoxCross
              id={"DynamicScraperCheckBox1"}
              onCheckboxChange={handleIsUsingDynamicScraperClick}
              checked={isUsingDynamicScraper}
            />
          </div>
          <div
            className={`absolute -top-6 right-2 transition-all ${
              showLoadmoreMore || showPaginationMore ? "" : "opacity-0"
            }`}
          >
            <CheckBoxTick
              id={"DynamicScraperCheckBox2"}
              onCheckboxChange={handleIsUsingDynamicScraperClick}
              checked={isUsingDynamicScraper}
            />
          </div>
        </div>
      </div>
      <div
        className={`pl-6 space-y-8 slide-transition ${
          isUsingDynamicScraper ? "slide-down1" : "slide-up"
        } `}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="scale-50">
              <CheckBoxTick
                id={"MorePaginationCheckboxCrossed"}
                onCheckboxChange={handleMorePaginationClick}
                checked={showPaginationMore}
              />
            </div>
            <label htmlFor="pagination" className="text-sm">
              Pagination
            </label>
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
          <div className="flex items-center space-x-4">
            <div className="scale-50">
              <CheckBoxTick
                id={"MoreLoadmoreCheckboxCrossed"}
                onCheckboxChange={handleMoreLoadmoreClick}
                checked={showLoadmoreMore}
              />
            </div>
            <label htmlFor="loadMore" className="text-sm">
              Load More
            </label>
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
