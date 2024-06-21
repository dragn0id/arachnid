import "./CustomRadioButton7.css";

export default function CustomRadioButton7() {
  return (
    <>
      <div className="flex flex-col space-y-4 p-5">
        <label className="relative flex items-center cursor-pointer">
          <input
            defaultChecked
            className="sr-only peer"
            name="futuristic-radio"
            type="radio"
          />
          <div className="w-6 h-6 bg-transparent border-2 border-red-500 rounded-full peer-checked:bg-red-500 peer-checked:border-red-500 peer-hover:shadow-lg peer-hover:shadow-red-500/50 peer-checked:shadow-lg peer-checked:shadow-red-500/50 transition duration-300 ease-in-out"></div>
          <span className="ml-2 text-white">Hard</span>
        </label>
        <label className="relative flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            name="futuristic-radio"
            type="radio"
          />
          <div className="w-6 h-6 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"></div>
          <span className="ml-2 text-white">Normal</span>
        </label>
        <label className="relative flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            name="futuristic-radio"
            type="radio"
          />
          <div className="w-6 h-6 bg-transparent border-2 border-green-500 rounded-full peer-checked:bg-green-500 peer-checked:border-green-500 peer-hover:shadow-lg peer-hover:shadow-green-500/50 peer-checked:shadow-lg peer-checked:shadow-green-500/50 transition duration-300 ease-in-out"></div>
          <span className="ml-2 text-white">Easy</span>
        </label>
      </div>
    </>
  );
}
