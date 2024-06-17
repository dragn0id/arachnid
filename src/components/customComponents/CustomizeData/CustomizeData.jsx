import { useState } from "react";

export default function CustomizeData() {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-5678" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "555-9012" },
    { id: 4, name: "Sarah Lee", email: "sarah@example.com", phone: "555-3456" },
    { id: 5, name: "Tom Wilson", email: "tom@example.com", phone: "555-7890" },
    {
      id: 6,
      name: "Alice Green",
      email: "alice@example.com",
      phone: "555-2468",
    },
    {
      id: 7,
      name: "David Brown",
      email: "david@example.com",
      phone: "555-7890",
    },
    {
      id: 8,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "555-1357",
    },
    {
      id: 9,
      name: "Michael Taylor",
      email: "michael@example.com",
      phone: "555-2468",
    },
    {
      id: 10,
      name: "Jessica Wilson",
      email: "jessica@example.com",
      phone: "555-7890",
    },
  ]);

  const [editingColumn, setEditingColumn] = useState(null);

  const handleRenameColumn = (columnIndex) => {
    setEditingColumn(columnIndex);
  };

  const handleSaveColumnName = (oldColumnName, newColumnName) => {
    setData((prevData) => {
      if (!prevData.length) return prevData; // Early return if prevData is empty

      const newData = prevData.map((row) => {
        // Use Object.prototype.hasOwnProperty.call instead of row.hasOwnProperty
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
            // Use the safer approach here as well
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
    <div className="overflow-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {Object.keys(data[0]).map((key, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300"
              >
                {editingColumn === index ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
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
                    <button size="icon" onClick={() => setEditingColumn(null)}>
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    {key}
                    <div className="flex items-center gap-2">
                      <button
                        size="icon"
                        onClick={() => handleRenameColumn(index)}
                      >
                        <PenIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-500 dark:text-red-400"
                        size="icon"
                        onClick={() => handleDeleteColumn(index)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "bg-white dark:bg-gray-950"
              }`}
            >
              {Object.values(row).map((value, columnIndex) => (
                <td
                  key={columnIndex}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
          {data.length > 5 && (
            <tr className={`bg-gray-100 dark:bg-gray-800`}>
              <td
                colSpan={Object.keys(data[0]).length}
                className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
              >
                ...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end text-gray-500 dark:text-gray-400">
        Total rows: {data.length}
      </div>
    </div>
  );
}

function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
