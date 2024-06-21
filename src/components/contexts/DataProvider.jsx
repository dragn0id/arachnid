/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    {
      id: 1,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "John Doee",
      email: "john@example.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      phone: "555-1234",
    },
    {
      id: 2,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
    },
    {
      id: 3,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
    },
    {
      id: 4,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Sarah Lee",
      email: "sarah@example.com",
      phone: "555-3456",
    },
    {
      id: 5,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Tom Wilson",
      email: "tom@example.com",
      phone: "555-7890",
    },
    {
      id: 6,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Alice Green",
      email: "alice@example.com",
      phone: "555-2468",
    },
    {
      id: 7,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "David Brown",
      email: "david@example.com",
      phone: "555-7890",
    },
    {
      id: 8,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Emily Davis",
      email: "emily@example.com",
      phone: "555-1357",
    },
    {
      id: 9,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Michael Taylor",
      email: "michael@example.com",
      phone: "555-2468",
    },
    {
      id: 10,
      nameesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss:
        "Jessica Wilson",
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
