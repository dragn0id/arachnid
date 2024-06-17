/* eslint-disable no-undef */
import "./App.css";
import CustomGradientSelectTargetButton from "./components/customComponents/CustomGradientSelectTargetButton/CustomGradientSelectTargetButton";
import CustomizeData from "./components/customComponents/CustomizeData/CustomizeData";
import DynamicScrapingSection from "./components/customComponents/DynamicScrapingSection/DynamicScrapingSection";

function App() {
  return (
    <>
      <div className="font-alata flex flex-col w-screen text-white">
        <header className=" p-6 space-y-6 flex flex-col justify-center items-center">
          <h1 className="text-center font-alata text-5xl font-normal custom-gradient-text">
            Arachnid
          </h1>
          <div className="flex justify-center">
            <CustomGradientSelectTargetButton />
          </div>
        </header>
        <main className="flex-1 flex flex-col p-4 space-y-6">
          <DynamicScrapingSection />
          <div className="bg-gray-800 p-4 rounded-md space-y-4">
            <h2 className="text-lg font-semibold">CUSTOMISE DATASET</h2>
            <CustomizeData />
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="outputFormat" className="text-sm">
                  Output Format
                </label>
                <div className="flex items-center bg-gray-700 rounded-md">
                  <input
                    type="radio"
                    name="outputFormat"
                    id="json"
                    className="form-radio"
                    defaultChecked
                  />
                  <label htmlFor="json" className="text-xs px-2 py-1">
                    JSON
                  </label>
                  <input
                    type="radio"
                    name="outputFormat"
                    id="csv"
                    className="form-radio"
                  />
                  <label htmlFor="csv" className="text-xs px-2 py-1">
                    CSV
                  </label>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
