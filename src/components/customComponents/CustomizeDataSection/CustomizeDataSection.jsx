/* eslint-disable react/prop-types */
import { useState } from "react";
import DynamicTable from "./DynamicTable/DynamicTable";
import OutputFormatSelectionSection from "./OutputFormatSelectionSection/OutputFormatSelectionSection";
import SelectiveFilterScrapedDataDisplay from "./SelectiveFilterScrapedDataDisplay/SelectiveFilterScrapedDataDisplay";

export default function CustomizeDataSection() {
  const [isSelectivelyFiltering, setIsSelectivelyFiltering] = useState(true);

  return (
    <>
      <div>
        <h2 className="text-white text-base font-semibold border-y border-t-white border-b-slate-500 p-2 w-full">
          CUSTOMISE DATASET
        </h2>
        {isSelectivelyFiltering ? (
          <SelectiveFilterScrapedDataDisplay
            setIsSelectivelyFiltering={setIsSelectivelyFiltering}
          />
        ) : (
          <DynamicTable />
        )}
      </div>
      <OutputFormatSelectionSection />
    </>
  );
}
