/* eslint-disable no-undef */
import "./App.css";
import ArachnidHeader from "./components/customComponents/ArachnidHeader/ArachnidHeader";
import DynamicScrapingSection from "./components/customComponents/DynamicScrapingSection/DynamicScrapingSection";
import { DataProvider } from "./components/contexts/DataProvider";
import CustomizeDataSection from "./components/customComponents/CustomizeDataSection/CustomizeDataSection";

function App() {
  return (
    <>
      <DataProvider>
        <div className="font-poppins flex flex-col w-screen text-white">
          <ArachnidHeader />
          <main className="flex-1 flex flex-col space-y-6 mb-10">
            <DynamicScrapingSection />
            <CustomizeDataSection />
          </main>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
