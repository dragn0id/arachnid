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
  } = useContext(DataContext);

  function handleOutputFormatJsonClick(checked) {
    setOutputFormatJson(checked);
  }

  function handleOutputFormatCsvClick(checked) {
    setOutputFormatCsv(checked);
  }

  return (
    <>
      <h3 className="text-white text-base font-normal border-t border-t-slate-500 p-2 pl-4 w-full">
        Output Format
      </h3>
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
    </>
  );
}
