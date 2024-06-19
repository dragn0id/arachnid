/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doee",
      email: "john@example.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      phone: "555-1234",
    },
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

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
