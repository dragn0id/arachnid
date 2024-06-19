import DynamicTable from "./DynamicTable/DynamicTable";

export default function CustomizeDataSection() {
  return (
    <>
      <h2 className="text-white text-base font-semibold border-y border-t-white border-b-slate-500 p-2 w-full">
        CUSTOMISE DATASET
      </h2>
      <DynamicTable />
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
    </>
  );
}
