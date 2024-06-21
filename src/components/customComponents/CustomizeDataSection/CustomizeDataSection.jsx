import DynamicTable from "./DynamicTable/DynamicTable";
import OutputFormatSelectionSection from "./OutputFormatSelectionSection/OutputFormatSelectionSection";

export default function CustomizeDataSection() {
  return (
    <>
      <div>
        <h2 className="text-white text-base font-semibold border-y border-t-white border-b-slate-500 p-2 w-full">
          CUSTOMISE DATASET
        </h2>
        <DynamicTable />
      </div>
      <OutputFormatSelectionSection />
    </>
  );
}
