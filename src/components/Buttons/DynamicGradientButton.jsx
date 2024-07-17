/* eslint-disable react/prop-types */
export default function DynamicGradientButton({ onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-3 py-1 rounded-[18px] custom-gradient w-fit h-fit transition-all duration-100 transform hover:scale-105 active:scale-95"
      style={{
        background: "linear-gradient(81deg, #0400D7 0.28%, #3BCB98 100%)",
      }}
    >
      <span className="flex gap-3 justify-center items-center">
        {icon}
        <span className="text-white text-center font-poppins text-lg font-medium whitespace-nowrap">
          {children}
        </span>
      </span>
    </button>
  );
}
