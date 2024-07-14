/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [outputFormatJson, setOutputFormatJson] = useState(false);
  const [outputFormatCsv, setOutputFormatCsv] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doee",
      email: "john@example.com",
      phone: "555-1234",
      salary: 50000,
      price: "$ 505",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      salary: 52000,
      price: "$ 505 rupees",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      salary: 50800,
      price: "50 355wwf rupees35",
    },
    {
      id: 4,
      name: "Sarah Lee",
      email: "sarah@example.com",
      phone: "555-3456",
      salary: 50500,
      price: "5025 rupees2",
    },
    {
      id: 5,
      name: "Tom Wilson",
      email: "tom@example.com",
      phone: "555-7890",
      salary: 54600,
      price: "105 rupees",
    },
    {
      id: 6,
      name: "Alice Green",
      email: "alice@example.com",
      phone: "555-2468",
      salary: 45000,
      price: "56705 rupees",
    },
    {
      id: 7,
      name: "David Brown",
      email: "david@example.com",
      phone: "555-7890",
      salary: 5000,
      price: "50435 rupees",
    },
    {
      id: 8,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "555-1357",
      salary: 8000,
      price: "50235 rupees",
    },
    {
      id: 9,
      name: "Michael Taylor",
      email: "michael@example.com",
      phone: "555-2468",
      salary: 30000,
      price: "505 rupees",
    },
    {
      id: 10,
      name: "Jessica Wilson",
      email: "jessica@example.com",
      phone: "555-7890",
      salary: 50000,
      price: "505 rupees",
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
