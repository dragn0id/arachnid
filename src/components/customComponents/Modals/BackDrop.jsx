/* eslint-disable react/prop-types */

const Backdrop = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center fixed top-0 left-0 w-dvw h-dvh bg-black bg-opacity-50 z-50"
    >
      {children}
    </div>
  );
};

export default Backdrop;
