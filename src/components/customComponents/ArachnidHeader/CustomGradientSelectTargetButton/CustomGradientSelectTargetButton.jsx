import { useState } from "react";
import InspectElementLogo1 from "../../../../assets/images/InspectElement1.svg";
import { CancelIcon, ExportIcon } from "../../../svgFunctions/AllSvgFunctions";

export default function CustomGradientSelectTargetButton() {
  const [isSelected, setIsSelected] = useState(false);

  function handleTargetSelectClick() {
    setIsSelected(true);
  }

  function handleExportClick() {
    console.log("Exporting data...");
  }

  function handleCancelClick() {
    setIsSelected(false);
  }

  return (
    <>
      {isSelected === false ? (
        <>
          <button
            onClick={handleTargetSelectClick}
            className="flex items-center justify-center rounded-[18px] custom-gradient w-52 h-16 transition-all duration-500"
            style={{
              background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
            }}
          >
            <span className="flex gap-3">
              <img src={InspectElementLogo1} alt="InspectElementLogo1" />
              <span className="text-white text-center font-poppins text-lg font-medium whitespace-nowrap">
                Select Target
              </span>
            </span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleExportClick}
            className="flex items-center justify-center rounded-[18px] custom-gradient w-36 h-16 transition-all duration-500"
            style={{
              background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
            }}
          >
            <span className="flex gap-3">
              <ExportIcon />
              <span className="text-white text-center font-poppins text-lg font-medium">
                Export
              </span>
            </span>
          </button>
          <button
            className="transition-all duration-500"
            onClick={handleCancelClick}
          >
            <CancelIcon />
          </button>
        </>
      )}
    </>
  );
}
