import { useContext, useState } from "react";
import InspectElementLogo1 from "../../../../assets/images/InspectElement1.svg";
import { CancelIcon, ExportIcon } from "../../../svgFunctions/AllSvgFunctions";
import { DataContext } from "../../../contexts/DataProvider";
import "./CustomGradientSelectTargetButton.css";

export default function CustomGradientSelectTargetButton() {
  const [isSelected, setIsSelected] = useState(false);
  const { data, outputFormatCsv, outputFormatJson } = useContext(DataContext);

  function handleTargetSelectClick() {
    setIsSelected(true);
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

  function handleCancelClick() {
    setIsSelected(false);
  }

  return (
    <>
      {isSelected === false ? (
        <>
          <button
            onClick={handleTargetSelectClick}
            className="flex items-center justify-center rounded-[18px] custom-gradient w-52 h-16 transition-all duration-100 transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
            }}
          >
            <span className="flex gap-3">
              <img src={InspectElementLogo1} alt="InspectElementLogo1" />
              <span className="text-white text-center font-poppins text-lg font-medium whitespace-nowrap">
                Select Target
              </span>
            </span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleExportClick}
            className="flex items-center justify-center rounded-[18px] custom-gradient w-36 h-16 transition-all duration-100 transform hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
            }}
          >
            <span className="flex gap-3">
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
      )}
    </>
  );
}
