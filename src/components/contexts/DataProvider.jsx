/* eslint-disable react/prop-types */
import { createContext, useRef, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputFormatJson, setOutputFormatJson] = useState(false);
  const [outputFormatCsv, setOutputFormatCsv] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("SelectTarget");
  const [isSelectivelyFiltering, setIsSelectivelyFiltering] = useState(true);
  const exportSectionRef = useRef(null);
  const [showNoExportFormatAlert, setShowNoExportFormatAlert] = useState(false);

  const [data, setData] = useState([
    // Dummy data
    {
      id: 1,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:
        "John Doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      email: "john@example.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-1234",
      salary: 50000,
      price: "$ 505",
      NoData: null,
      SomeData: null,
    },
    {
      id: 2,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Jane Smith",
      email: "jane@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-5678",
      salary: 52000,
      price: "$ 505 rupees",
      NoData: null,
      SomeData: null,
    },
    {
      id: 3,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Bob Johnson",
      email: "bob@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-9012",
      salary: 50800,
      price: "50 355wwf rupees35",
      NoData: null,
      SomeData: null,
    },
    {
      id: 4,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Sarah Lee",
      email: "sarah@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-3456",
      salary: 50500,
      price: "5025 rupees2",
      NoData: null,
      SomeData: null,
    },
    {
      id: 5,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Tom Wilson",
      email: "tom@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-7890",
      salary: 54600,
      price: "105 rupees",
      NoData: null,
      SomeData: null,
    },
    {
      id: 6,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Alice Green",
      email: "alice@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-2468",
      salary: 45000,
      price: "56705 rupees",
      NoData: null,
      SomeData: "Some Data",
    },
    {
      id: 7,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "David Brown",
      email: "david@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-7890",
      salary: 5000,
      price: "50435 rupees",
      NoData: null,
      SomeData: null,
    },
    {
      id: 8,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Emily Davis",
      email: "emily@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-1357",
      salary: 8000,
      price: "50235 rupees",
      NoData: null,
      SomeData: "Some Data",
    },
    {
      id: 9,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Michael Taylor",
      email: "michael@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-2468",
      salary: 30000,
      price: "505 rupees",
      NoData: null,
      SomeData: null,
    },
    {
      id: 10,
      nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "Jessica Wilson",
      email: "jessica@example.com",
      phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: "555-7890",
      salary: 50000,
      price: "505 rupees",
      NoData: null,
      SomeData: null,
    },
  ]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        outputFormatCsv,
        outputFormatJson,
        setOutputFormatCsv,
        setOutputFormatJson,
        currentStatus,
        setCurrentStatus,
        isSelectivelyFiltering,
        setIsSelectivelyFiltering,
        exportSectionRef,
        showNoExportFormatAlert,
        setShowNoExportFormatAlert,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
