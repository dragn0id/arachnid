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
  const [currentIndexes, setCurrentIndexes] = useState({});

  // Function to find the first valid index for a key
  const findFirstValidIndex = (key) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][key] !== null && data[i][key] !== undefined) {
        return i;
      }
    }
    return -1; // Return -1 if no valid index is found
  };

  useEffect(() => {
    const newIndexes = data[0]
      ? Object.keys(data[0]).reduce((acc, key) => {
          const firstValidIndex = findFirstValidIndex(key);
          return {
            ...acc,
            [key]: firstValidIndex >= 0 ? firstValidIndex : 0, // Use 0 if no valid index is found
          };
        }, {})
      : {};
    setCurrentIndexes(newIndexes);
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
      <div className="flex flex-col p-1 gap-y-4">
        <h3 className="p-2">Selectively Filter The Output</h3>
        <div className="p-[1px]">
          {keys.map((key) => {
            return (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                  <div className="scale-50">
                    <CheckBoxTick
                      id={`DynamicScraperCheckBox${key}`}
                      onCheckboxChange={() => handleCheckboxChange(key)}
                      checked={!!checkedKeys[key]}
                    />
                  </div>
                  <label
                    htmlFor={`DynamicScraperCheckBox${key}`}
                    className="custom-scrollbar text-sm overflow-x-auto whitespace-nowrap w-fit min-w-20 max-w-20"
                  >
                    {key}
                  </label>
                  {/* Fallback for undefined data */}
                  <p className="custom-scrollbar text-base overflow-x-auto whitespace-nowrap w-fit min-w-36 max-w-36">
                    {data[currentIndexes[key]]?.[`${key}`] ?? "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <DynamicGradientButton
                    onClick={() => handleDataChange(key, "prev")}
                    icon={<LeftArrowIcon className="w-5 h-5" />}
                  ></DynamicGradientButton>
                  <DynamicGradientButton
                    onClick={() => handleDataChange(key, "next")}
                    icon={<RightArrowIcon className="w-5 h-5" />}
                  ></DynamicGradientButton>
                </div>
              </div>
            );
          })}
        </div>
        <DynamicGradientButton
          onClick={handleSelectiveFilteringDone}
          icon={<SubmitIcon className="w-5 h-5" />}
        >
          Done
        </DynamicGradientButton>
      </div>
    </>
  );
}
