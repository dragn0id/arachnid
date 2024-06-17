import InspectElementLogo from "../../../../public/images/InspectElement.svg";

export default function CustomGradientSelectTargetButton() {
  return (
    <>
      <button
        className="flex items-center justify-center rounded-[18px] custom-gradient w-52 h-16"
        style={{
          background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
        }}
      >
        <span className="flex gap-3">
          <img src={InspectElementLogo} alt="InspectElementLogo" />
          <span className="text-white text-center font-poppins text-lg font-medium">
            Select Target
          </span>
        </span>
      </button>
    </>
  );
}
