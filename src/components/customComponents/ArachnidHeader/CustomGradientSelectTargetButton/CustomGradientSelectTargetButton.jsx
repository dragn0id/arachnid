import { useContext, useState } from "react";
import InspectElementLogo1 from "../../../../assets/images/InspectElement1.svg";
import {
  CancelIcon,
  ExportIcon,
  FindingTargetIcon,
  ScrapeDataIcon,
} from "../../../svgFunctions/AllSvgFunctions";
import { DataContext } from "../../../contexts/DataProvider";
import "./CustomGradientSelectTargetButton.css";
import { perturbNumericData } from "../../utils/AnonymizationFunctions";
import selectData from "../../utils/selectData";
import getDataFromElements from "../../utils/ScrapeData";

export default function CustomGradientSelectTargetButton() {
  const [isSelectInactive, setIsSelectInactive] = useState(true);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { data, setData, outputFormatCsv, outputFormatJson } =
    useContext(DataContext);

  async function handleTargetSelectClick() {
    handleUserIsFindingTarget();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 'chrome://' tabs return undefined
    if (tab.url === undefined) {
      alert("Please select a valid tab");
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: selectData,
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(message);
      if (message.action === "elementSelected") {
        handleTargetCanBeScraped();
      }
    });
  }

  function handleUserIsFindingTarget() {
    setIsSelectInactive(false);
    setIsSelectActive(true);
  }

  function handleTargetCanBeScraped() {
    setIsSelectActive(false);
    setIsScraping(true);
  }

  async function handleUserCanExport() {
    console.log("in handleusercanexport");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getDataFromElements,
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "dataScraped") {
        console.log("Data scraped successfully");
        console.log(JSON.parse(message.data));
        setData(JSON.parse(message.data));
        // handleperturbNumericData(JSON.parse(message.data));
      }
    });
    setIsScraping(false);
    setIsExporting(true);
  }

  function ExportAsJson() {
    // Assuming `data` is your array of objects
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Creating a temporary anchor element to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "arachnid.json"; // Name of the file to be downloaded
    document.body.appendChild(a); // Append the anchor to the document
    a.click(); // Trigger a click on the anchor

    // Clean up by removing the anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function ExportAsCsv() {
    // Assuming `data` is your array of objects and all objects have the same keys
    if (data.length === 0) return; // Check if data is empty

    // Extract column names (keys) from the first object
    const columnNames = Object.keys(data[0]);
    const csvHeader = columnNames.join(",") + "\n"; // Create the header row

    // Convert each object to a CSV row
    const csvRows = data
      .map((item) =>
        columnNames
          .map((fieldName) => JSON.stringify(item[fieldName], replacer))
          .join(",")
      )
      .join("\n"); // Join rows with newline character here

    // Combine header and rows, and convert to Blob
    const csvData = csvHeader + csvRows; // Directly concatenate header and rows
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Creating a temporary anchor element to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "arachnid.csv"; // Name of the file to be downloaded
    document.body.appendChild(a); // Append the anchor to the document
    a.click(); // Trigger a click on the anchor

    // Clean up by removing the anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Custom replacer function for JSON.stringify to handle undefined values, etc.
  function replacer(key, value) {
    if (value === null) {
      return "";
    }
    return value;
  }

  function handleCancelClick() {
    setIsScraping(false);
    setIsExporting(false);
    setIsSelectActive(false);
    setIsSelectInactive(true);
  }

  function handleExportClick() {
    if (!outputFormatCsv && !outputFormatJson) {
      alert("Please select an output format");
      return;
    }
    if (outputFormatCsv) {
      ExportAsCsv();
    }
    if (outputFormatJson) {
      ExportAsJson();
    }
  }

  async function handleperturbNumericData(NewData) {
    console.log("in handleperturbNumericData");
    console.log("NewData:", NewData);
    const perturbedData = perturbNumericData(NewData);
    await setData(perturbedData);
  }

  const SelectTargetInactiveButton = (
    <button
      onClick={handleTargetSelectClick}
      className="flex items-center justify-center rounded-[18px] custom-gradient w-52 h-16 transition-all duration-100 transform hover:scale-105 active:scale-95"
      style={{
        background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
      }}
    >
      <span className="flex gap-3 justify-center items-center">
        <img src={InspectElementLogo1} alt="InspectElementLogo1" />
        <span className="text-white text-center font-poppins text-lg font-medium whitespace-nowrap">
          Select Target
        </span>
      </span>
    </button>
  );

  const SelectTargetActiveButton = (
    <>
      <button
        // onClick={handleTargetCanBeScraped}
        className="flex items-center justify-center rounded-[18px] custom-gradient w-52 h-16 transition-all duration-100 transform hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
        }}
      >
        <span className="flex gap-3 justify-center items-center">
          <FindingTargetIcon className="w-10 h-10" />
          <span className="text-white text-center font-poppins text-lg font-medium">
            Finding Target
          </span>
        </span>
      </button>
      <button
        className="transition-all duration-100 transform hover:scale-105 active:scale-95"
        onClick={handleCancelClick}
      >
        <CancelIcon />
      </button>
    </>
  );

  const ScrapeDataButton = (
    <>
      <button
        onClick={handleUserCanExport}
        className="flex items-center justify-center rounded-[18px] custom-gradient w-52 h-16 transition-all duration-100 transform hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
        }}
      >
        <span className="flex gap-3 justify-center items-center">
          <ScrapeDataIcon className="w-10 h-10" />
          <span className="text-white text-center font-poppins text-lg font-medium">
            Scrape Data
          </span>
        </span>
      </button>
      <button
        className="transition-all duration-100 transform hover:scale-105 active:scale-95"
        onClick={handleCancelClick}
      >
        <CancelIcon />
      </button>
    </>
  );

  const ExportButton = (
    <>
      <button
        onClick={handleExportClick}
        className="flex items-center justify-center rounded-[18px] custom-gradient w-36 h-16 transition-all duration-100 transform hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
        }}
      >
        <span className="flex gap-3 justify-center items-center">
          <ExportIcon />
          <span className="text-white text-center font-poppins text-lg font-medium">
            Export
          </span>
        </span>
      </button>
      <button
        className="transition-all duration-100 transform hover:scale-105 active:scale-95"
        onClick={handleCancelClick}
      >
        <CancelIcon />
      </button>
    </>
  );

  return (
    <>
      {isSelectInactive && SelectTargetInactiveButton}
      {isSelectActive && SelectTargetActiveButton}
      {isScraping && ScrapeDataButton}
      {isExporting && ExportButton}
    </>
  );
}
