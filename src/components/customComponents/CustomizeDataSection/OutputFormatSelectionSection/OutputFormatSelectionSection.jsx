/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataProvider";
import CheckBoxTick from "../../CustomCheckBoxes/CheckBox1/CheckBoxTick/CheckBoxTick";
import "./OutputFormatSelectionSection.css";

export default function OutputFormatSelectionSection() {
  const {
    outputFormatCsv,
    outputFormatJson,
    setOutputFormatCsv,
    setOutputFormatJson,
    exportSectionRef,
    showNoExportFormatAlert,
    setShowNoExportFormatAlert,
  } = useContext(DataContext);

  function handleOutputFormatJsonClick(checked) {
    setOutputFormatJson(checked);
  }

  function handleOutputFormatCsvClick(checked) {
    setOutputFormatCsv(checked);
  }

  const handleCloseAlert = () => {
    setShowNoExportFormatAlert(false);
  };

  return (
    <>
      <h3 className="text-white text-base font-normal border-t border-t-slate-500 p-2 pl-4 w-full">
        Output Format
      </h3>
      {showNoExportFormatAlert && (
        <div
          id="alert-SameColumnName"
          className="flex items-center p-4 mb-4 text-red-400 rounded-lg bg-gray-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium break-all">
            No output format selected
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-gray-800 text-red-400 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-gray-500 inline-flex items-center justify-center h-8 w-8"
            onClick={handleCloseAlert}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="h-[100px] flex items-center justify-center space-x-10">
        <div className="flex items-center me-4">
          <div className="scale-75">
            <CheckBoxTick
              id={"JsonCheckbox"}
              onCheckboxChange={handleOutputFormatJsonClick}
              checked={outputFormatJson}
            />
          </div>
          <label htmlFor="json" className="text-base px-2 py-1">
            JSON
          </label>
        </div>
        <div className="flex items-center me-4">
          <div className="scale-75">
            <CheckBoxTick
              id={"CSVCheckbox"}
              onCheckboxChange={handleOutputFormatCsvClick}
              checked={outputFormatCsv}
            />
          </div>
          <label htmlFor="csv" className="text-base px-2 py-1">
            CSV
          </label>
        </div>
      </div>
      <div className="text-sm p-2 text-white flex items-center justify-center">
        <p ref={exportSectionRef} id="exportSection">
          Select the output format for the data
        </p>
      </div>
    </>
  );
}
