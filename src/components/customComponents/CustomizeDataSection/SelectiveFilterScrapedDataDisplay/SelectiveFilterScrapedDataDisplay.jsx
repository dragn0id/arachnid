/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../contexts/DataProvider";
import CheckBoxTick from "../../CustomCheckBoxes/CheckBox1/CheckBoxTick/CheckBoxTick";
import {
  LeftArrowIcon,
  RightArrowIcon,
  SubmitIcon,
} from "../../../svgFunctions/AllSvgFunctions";
import DynamicGradientButton from "../../../Buttons/DynamicGradientButton";

export default function SelectiveFilterScrapedDataDisplay({
  setIsSelectivelyFiltering,
}) {
  const { data, setData } = useContext(DataContext);
  const [checkedKeys, setCheckedKeys] = useState({});
  // Initialize currentIndexes for each key
  const [currentIndexes, setCurrentIndexes] = useState(
    data[0]
      ? Object.keys(data[0]).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
      : {}
  );

  useEffect(() => {
    // Step 2: Use useEffect to monitor changes in `data`
    setCurrentIndexes(
      data[0]
        ? Object.keys(data[0]).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
        : {}
    );
  }, [data]); // Dependency array with `data` to trigger effect when `data` changes

  function handleCheckboxChange(key) {
    setCheckedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleDataChange(key, direction) {
    setCurrentIndexes((prevIndexes) => {
      let newIndex = prevIndexes[key];

      if (direction === "next") {
        newIndex = (newIndex + 1) % data.length;
      } else if (direction === "prev") {
        newIndex = (newIndex - 1 + data.length) % data.length; // Ensures the index wraps around correctly
      }

      return {
        ...prevIndexes,
        [key]: newIndex,
      };
    });
  }

  function handleSelectiveFilteringDone() {
    setIsSelectivelyFiltering(false);
    const newData = data.map((row) => {
      const newRow = {};
      Object.keys(row).forEach((key) => {
        if (checkedKeys[key]) {
          newRow[key] = row[key];
        }
      });
      return newRow;
    });
    setData(newData);
  }

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <>
      {keys.map((key) => {
        // Debugging output
        console.log(
          `Key: ${key}, Index: ${currentIndexes[key]}, Data at index:`,
          data[currentIndexes[key]]
        );

        return (
          <div key={key} className="flex items-center space-x-4">
            <div className="scale-50">
              <CheckBoxTick
                id={`DynamicScraperCheckBox${key}`}
                onCheckboxChange={() => handleCheckboxChange(key)}
                checked={!!checkedKeys[key]}
              />
            </div>
            <label htmlFor={`DynamicScraperCheckBox${key}`} className="text-sm">
              {key}
            </label>
            {/* Fallback for undefined data */}
            <p>{data[currentIndexes[key]]?.[`${key}`] ?? "N/A"}</p>
            <DynamicGradientButton
              onClick={() => handleDataChange(key, "prev")}
              icon={<LeftArrowIcon className="w-5 h-5" />}
            >
              Previous {key}
            </DynamicGradientButton>
            <DynamicGradientButton
              onClick={() => handleDataChange(key, "next")}
              icon={<RightArrowIcon className="w-5 h-5" />}
            >
              Next {key}
            </DynamicGradientButton>
          </div>
        );
      })}

      <DynamicGradientButton
        onClick={handleSelectiveFilteringDone}
        icon={<SubmitIcon className="w-5 h-5" />}
      >
        Done
      </DynamicGradientButton>
    </>
  );
}
