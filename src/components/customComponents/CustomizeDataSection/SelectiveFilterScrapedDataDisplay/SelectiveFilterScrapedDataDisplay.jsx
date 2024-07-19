/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../contexts/DataProvider";
import CheckBoxTick from "../../CustomCheckBoxes/CheckBox1/CheckBoxTick/CheckBoxTick";
import {
  CheckIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SubmitIcon,
  XIcon,
} from "../../../svgFunctions/AllSvgFunctions";
import DynamicGradientButton from "../../Buttons/DynamicGradientButton";

export default function SelectiveFilterScrapedDataDisplay() {
  const { data, setData, setIsSelectivelyFiltering } = useContext(DataContext);
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

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  const allChecked = keys.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});

  const areAllChecked = areObjectsEqual(checkedKeys, allChecked);

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

  function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

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

  function handleSelectAll() {
    setCheckedKeys(allChecked);
  }

  function handleDeselectAll() {
    setCheckedKeys({});
  }

  return (
    <>
      <div className="flex flex-col p-1 gap-y-4">
        <div className="p-[1px]">
          <div className=" text-sm p-2">
            <p>Select the data you want to keep in the final output.</p>
            <p>Use the arrows to navigate through the data.</p>
          </div>
          <div className="flex">
            <button
              className="bg-[#D9D9D940] p-2 rounded-md mr-auto flex gap-2 items-center"
              onClick={areAllChecked ? handleDeselectAll : handleSelectAll}
            >
              {areAllChecked ? (
                <XIcon className="w-4 h-4" />
              ) : (
                <CheckIcon className="w-4 h-4" />
              )}
              {areAllChecked ? "Deselect All" : "Select All"}
            </button>
          </div>
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
                  <button
                    className="bg-[#D9D9D940] p-2 rounded-md"
                    onClick={() => handleDataChange(key, "prev")}
                  >
                    <LeftArrowIcon className="w-5 h-5" />
                  </button>

                  <button
                    className="bg-[#D9D9D940] p-2 rounded-md"
                    onClick={() => handleDataChange(key, "next")}
                  >
                    <RightArrowIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          <DynamicGradientButton
            onClick={handleSelectiveFilteringDone}
            icon={<SubmitIcon className="w-5 h-5 my-2" />}
          >
            Filter To Selected Data
          </DynamicGradientButton>
        </div>
      </div>
    </>
  );
}
