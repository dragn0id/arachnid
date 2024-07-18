/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/DataProvider";
import {
  NumberExtractorIcon,
  RenameIcon,
  ReplaceDataIcon,
  ThreeDotsIcon,
  TrashIcon,
  XIcon,
} from "../../../svgFunctions/AllSvgFunctions";
import Backdrop from "../../Modals/BackDrop";

export default function DynamicTable() {
  const { data, setData } = useContext(DataContext);
  const [showAllRows, setShowAllRows] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [replacingColumn, setReplacingColumn] = useState(null);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isOpenArray, setIsOpenArray] = useState(
    Array(data[0].length).fill(false)
  );

  const handleReplaceNullsModal = () => {
    setShowReplaceModal(true);
  };
  const handleReplaceNullsModalClose = () => {
    setShowReplaceModal(false);
    setReplacingColumn(null);
  };

  const setIsOpen = (index, state) => {
    setIsOpenArray((prevState) => {
      const newState = [...prevState];
      newState[index] = state;
      return newState;
    });
  };

  const handleShowMoreClick = () => {
    setShowAllRows(!showAllRows);
  };

  const handleRenameColumn = (columnIndex) => {
    setEditingColumn(columnIndex);
    setIsOpen(columnIndex, false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSaveColumnName = (oldColumnName, newColumnName) => {
    // Early return if prevData is empty, column names are the same, or newColumnName already exists
    setData((prevData) => {
      if (!prevData.length || oldColumnName === newColumnName) return prevData;

      // Check if newColumnName already exists in the data
      const columnNames = Object.keys(prevData[0]);
      if (columnNames.includes(newColumnName)) {
        setAlertMessage(`Column name "${newColumnName}" already exists.`);
        setShowAlert(true);
        return prevData; // Abort the operation or handle as needed
      }

      const newData = prevData.map((row) => {
        if (Object.prototype.hasOwnProperty.call(row, oldColumnName)) {
          const newRow = { ...row, [newColumnName]: row[oldColumnName] }; // Add the new column with the value of the old column
          delete newRow[oldColumnName]; // Remove the old column
          return newRow;
        }
        return row;
      });

      // To preserve the order of columns, reconstruct each object with the new column name in place
      const newOrderData = newData.map((row) => {
        const newRow = {};
        columnNames.forEach((key) => {
          if (key === oldColumnName) {
            newRow[newColumnName] = row[newColumnName];
          } else if (Object.prototype.hasOwnProperty.call(row, key)) {
            newRow[key] = row[key];
          }
        });
        return newRow;
      });
      return newOrderData;
    });
  };

  const handleDeleteColumn = (columnIndex) => {
    setData((prevData) => {
      if (!prevData.length) return prevData; // Early return if prevData is empty

      const keys = Object.keys(prevData[0]);
      if (columnIndex < 0 || columnIndex >= keys.length) return prevData; // Check columnIndex bounds

      const keyToDelete = keys[columnIndex]; // Identify the key (column name) to delete

      const newData = prevData.map((row) => {
        const newRow = { ...row };
        delete newRow[keyToDelete]; // Delete the column from the row
        return newRow;
      });

      return newData;
    });
    setIsOpen(columnIndex, false);
  };

  const extractNumbersAndReplaceFromColumn = (columnIndex) => {
    setData((prevData) => {
      // Check if prevData is empty
      if (!prevData.length) return prevData;

      // Get the keys (column names) from the first object, assuming all objects have the same structure
      const keys = Object.keys(prevData[0]);
      // Check if columnIndex is within bounds
      if (columnIndex < 0 || columnIndex >= keys.length) return prevData;

      // Identify the key (column name) to work with
      const keyToModify = keys[columnIndex];
      // Regular expression to match numbers
      const numberPattern = /\d+/g;

      // Map through each object in the array to replace the specified column's value with extracted numbers
      const modifiedData = prevData.map((item) => {
        // Ensure the value is a string before calling .match()
        const itemValueAsString = String(item[keyToModify]);
        const newValue =
          itemValueAsString.match(numberPattern)?.join("") || item[keyToModify];
        // Replace the original string with the extracted number, or keep the original if no number was found
        // Convert the newvalue to a type number if it is a number
        if (!isNaN(newValue)) {
          return { ...item, [keyToModify]: Number(newValue) };
        }
        return { ...item, [keyToModify]: newValue };
      });

      return modifiedData;
    });
    setIsOpen(columnIndex, false);
  };

  const handleReplaceNulls = (columnIndex, defaultValue) => {
    setData((prevData) => {
      if (!prevData.length) return prevData;
      const keys = Object.keys(prevData[0]);
      if (columnIndex < 0 || columnIndex >= keys.length) return prevData;
      const keyToModify = keys[columnIndex];
      const newData = prevData.map((item) => ({
        ...item,
        [keyToModify]:
          item[keyToModify] === null ? defaultValue : item[keyToModify],
      }));
      return newData;
    });
    setShowReplaceModal(false);
    setIsOpen(columnIndex, false);
  };

  return (
    <div className="overflow-x-auto p-4">
      {showAlert && (
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
            {alertMessage}
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
      <h3 className="p-2">Preview Output</h3>
      <div className="overflow-auto p-4 [mask-image:linear-gradient(to_right,transparent,white_2%,white_96%,transparent)]">
        <table
          className="w-full table-auto rounded-2xl"
          style={{ background: "rgba(255, 255, 255, 0.16)" }}
        >
          <thead>
            <tr className="border-b border-gray-300">
              {Object.keys(data[0]).map((key, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 font-normal text-white min-w-32 max-w-60 ${
                    index < Object.keys(data[0]).length - 1
                      ? "border-r border-gray-300"
                      : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {editingColumn === index ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="bg-gray-900 rounded-2xl pl-3 text-white min-w-15 w-full
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          defaultValue={key}
                          onBlur={(e) => {
                            const oldColumnName = key;
                            const newColumnName = e.target.value;
                            handleSaveColumnName(oldColumnName, newColumnName);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const oldColumnName = key;
                              const newColumnName = e.target.value;
                              handleSaveColumnName(
                                oldColumnName,
                                newColumnName
                              );
                              e.preventDefault();
                              setEditingColumn(null);
                            }
                          }}
                        />
                        <button
                          className="ml-2"
                          size="icon"
                          onClick={() => setEditingColumn(null)}
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center w-full min-w-15 flex items-center justify-between">
                        <span className="custom-scrollbar rounded-md overflow-x-auto whitespace-nowrap w-fit">
                          {key}
                        </span>
                        <Dropdown
                          isOpen={isOpenArray[index]}
                          setIsOpen={setIsOpen}
                          index={index}
                        >
                          <button
                            size="icon"
                            onClick={() => handleRenameColumn(index)}
                            className="flex justify-center items-center gap-4 px-4 py-2 text-sm text-white hover:text-purple-100"
                          >
                            <RenameIcon className="w-5 h-5" />
                            Rename
                          </button>
                          <button
                            className="flex justify-center items-center gap-4 text-red-400 hover:text-red-700 px-4 py-2 text-sm"
                            size="icon"
                            onClick={() => handleDeleteColumn(index)}
                          >
                            <TrashIcon className="w-5 h-5" />
                            Delete
                          </button>
                          <button
                            className="flex justify-center items-center gap-4 text-green-400 hover:text-green-300 px-4 py-2 text-sm"
                            size="icon"
                            onClick={() =>
                              extractNumbersAndReplaceFromColumn(index)
                            }
                          >
                            <NumberExtractorIcon className="w-7 h-7" />
                            Extract Numbers
                          </button>
                          {replacingColumn === index && showReplaceModal && (
                            <Backdrop onClick={handleReplaceNullsModalClose}>
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-col p-5 items-center justify-center w-[70%] h-[10%] max-w-3xl rounded-3xl bg-[#201E1F] border border-gray-200 shadow-md"
                              >
                                <div className="flex items-center gap-5">
                                  <input
                                    type="text"
                                    className="bg-gray-900 rounded-2xl pl-3 text-white min-w-15 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Replace Nulls With"
                                    onBlur={(e) => {
                                      const defaultValue = e.target.value;
                                      handleReplaceNulls(index, defaultValue);
                                      setReplacingColumn(null);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        const defaultValue = e.target.value;
                                        handleReplaceNulls(index, defaultValue);
                                        e.preventDefault();
                                        setReplacingColumn(null);
                                      }
                                    }}
                                  />
                                  <button
                                    className="ml-2"
                                    size="icon"
                                    onClick={() => setReplacingColumn(null)}
                                  >
                                    <XIcon className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </Backdrop>
                          )}
                          <button
                            className="flex justify-center items-center gap-4 text-blue-400 hover:text-blue-300 px-4 py-2 text-sm"
                            size="icon"
                            onClick={() => {
                              handleReplaceNullsModal();
                              setReplacingColumn(index);
                            }}
                          >
                            <ReplaceDataIcon className="w-7 h-7" />
                            Replace Data
                          </button>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .slice(0, showAllRows ? data.length : 5)
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(data[0]).map((key, columnIndex) => {
                    const value = row[key];
                    return (
                      <td
                        key={columnIndex}
                        className={`custom-scrollbar overflow-x-auto whitespace-nowrap w-fit px-4 py-2 text-gray-300 ${
                          columnIndex < Object.keys(data[0]).length - 1
                            ? "border-r border-gray-300"
                            : ""
                        }`}
                        style={{
                          maxWidth: "180px",
                          minWidth: "50px",
                        }}
                      >
                        {value !== null ? value : "NA"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            {data.length > 5 && (
              <tr onClick={handleShowMoreClick}>
                {Object.keys(data[0]).map((key, index) => (
                  <td
                    key={key}
                    className={`px-4 py-2 text-center text-gray-400 cursor-pointer ${
                      index < Object.keys(data[0]).length - 1
                        ? "border-r border-gray-300"
                        : ""
                    }`}
                    style={{
                      maxWidth: "180px",
                      minWidth: "50px",
                    }}
                  >
                    {showAllRows ? "Show less" : "Show more"}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end text-gray-400">
        {data.length} Rows
      </div>
    </div>
  );
}

const Dropdown = ({ children, isOpen, setIsOpen, index }) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-900"
          onClick={() => setIsOpen(index, !isOpen)}
        >
          <ThreeDotsIcon className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            background: "linear-gradient(180deg, #030303 0%, #1a0034 100%)",
          }}
          className="origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
