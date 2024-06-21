/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/DataProvider";
import {
  RenameIcon,
  TrashIcon,
  XIcon,
} from "../../../svgFunctions/AllSvgFunctions";
import "./DynamicTable.css";

export default function DynamicTable() {
  const { data, setData } = useContext(DataContext);
  const [showAllRows, setShowAllRows] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);

  const handleShowMoreClick = () => {
    setShowAllRows(!showAllRows);
  };

  const handleRenameColumn = (columnIndex) => {
    setEditingColumn(columnIndex);
  };

  const handleSaveColumnName = (oldColumnName, newColumnName) => {
    setData((prevData) => {
      // Early return if prevData is empty or column names are the same
      if (!prevData.length || oldColumnName === newColumnName) return prevData;

      const newData = prevData.map((row) => {
        if (Object.prototype.hasOwnProperty.call(row, oldColumnName)) {
          const newRow = { ...row, [newColumnName]: row[oldColumnName] }; // Add the new column with the value of the old column
          delete newRow[oldColumnName]; // Remove the old column
          return newRow;
        }
        return row;
      });

      // To preserve the order of columns, reconstruct each object with the new column name in place
      const keys = Object.keys(prevData[0]);
      const newOrderData = newData.map((row) => {
        const newRow = {};
        keys.forEach((key) => {
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
  };

  return (
    <div className="overflow-x-auto p-4">
      <h3 className="p-2">Preview Output</h3>
      <table
        className="w-full table-auto rounded-2xl"
        style={{ background: "rgba(255, 255, 255, 0.16)" }}
      >
        <thead>
          <tr className="border-b border-gray-300">
            {Object.keys(data[0]).map((key, index) => (
              <th
                key={index}
                className={`px-4 py-2 font-normal text-white min-w-32 max-w-fit ${
                  index < Object.keys(data[0]).length - 1
                    ? "border-r border-gray-300"
                    : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      size="icon"
                      onClick={() => handleRenameColumn(index)}
                    >
                      <RenameIcon className="w-5 h-5 mr-2" />
                    </button>
                    <button
                      className="text-red-500 dark:text-red-400"
                      size="icon"
                      onClick={() => handleDeleteColumn(index)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                  {editingColumn === index ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        className=" bg-gray-900 rounded-2xl pl-3 text-white min-w-15 w-full
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        defaultValue={key}
                        onBlur={(e) => {
                          const oldColumnName = key; // Get the old column name using the key
                          const newColumnName = e.target.value;
                          handleSaveColumnName(oldColumnName, newColumnName);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const oldColumnName = key; // Get the old column name using the key
                            const newColumnName = e.target.value;
                            handleSaveColumnName(oldColumnName, newColumnName);
                            e.preventDefault(); // Prevent the default action to keep focus
                            setEditingColumn(null); // Exit editing mode
                          }
                        }}
                      />
                      <button
                        className=""
                        size="icon"
                        onClick={() => setEditingColumn(null)}
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center w-full min-w-15">{key}</div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            // Render the first 5 rows or all rows based on the showAllRows state
            data
              .slice(0, showAllRows ? data.length : 5)
              .map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`custom-scrollbar px-4 py-2 text-gray-300 overflow-auto ${
                        columnIndex < Object.keys(data[0]).length - 1
                          ? "border-r border-gray-300"
                          : ""
                      }`}
                      style={{
                        maxWidth: "180px",
                        minWidth: "50px",
                      }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))
          }
          {data.length > 5 && (
            <tr onClick={handleShowMoreClick}>
              {Object.keys(data[0]).map((key, index) => (
                <td
                  key={index}
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
                  {/* Change the content based on the showAllRows state */}
                  {showAllRows ? (index === 0 ? "Show less" : "") : "..."}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end text-gray-400">
        {data.length} Rows
      </div>
    </div>
  );
}
