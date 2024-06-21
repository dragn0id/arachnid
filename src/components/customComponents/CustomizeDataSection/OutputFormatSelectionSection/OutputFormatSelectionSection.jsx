// import CustomRadioButton1 from "../../CustomRadioButtons/CustomRadioButton1/CustomRadioButton1";
// import CustomRadioButton2 from "../../CustomRadioButtons/CustomRadioButton2/CustomRadioButton2";
// import CustomRadioButton3 from "../../CustomRadioButtons/CustomRadioButton3/CustomRadioButton3";
// import CustomRadioButton4 from "../../CustomRadioButtons/CustomRadioButton4/CustomRadioButton4";
// import CustomRadioButton5 from "../../CustomRadioButtons/CustomRadioButton5/CustomRadioButton5";
// import CustomRadioButton6 from "../../CustomRadioButtons/CustomRadioButton6/CustomRadioButton6";
// import CustomRadioButton7 from "../../CustomRadioButtons/CustomRadioButton7/CustomRadioButton7";
import "./OutputFormatSelectionSection.css";

export default function OutputFormatSelectionSection() {
  return (
    <>
      <h3 className="text-white text-base font-normal border-t border-t-slate-500 p-2 pl-4 w-full">
        Output Format
      </h3>
      <div className="h-[100px] flex items-center justify-center space-x-40">
        <div className="flex items-center me-4">
          <input
            type="radio"
            name="outputFormat"
            id="json"
            className="form-radio w-10 h-10"
            defaultChecked
          />
          <label htmlFor="json" className="text-xs px-2 py-1">
            JSON
          </label>
        </div>
        <div className="flex items-center me-4">
          <input
            id="csv"
            type="radio"
            name="outputFormat"
            className="form-radio w-10 h-10"
          />
          <label htmlFor="csv" className="text-xs px-2 py-1">
            CSV
          </label>
        </div>
      </div>
      {/* <div className="flex justify-center items-center gap-10 m-40">
        <CustomRadioButton1 />
        <CustomRadioButton2 />
        <CustomRadioButton3 />
      </div>
      <div className="flex justify-center items-center gap-20 m-40">
        <CustomRadioButton4 />
        <CustomRadioButton5 />
        <CustomRadioButton6 />
        <CustomRadioButton7 />
      </div> */}
    </>
  );
}
