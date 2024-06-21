import WebImage from "../../../assets/images/top-left-web-image.png";
import CustomGradientSelectTargetButton from "./CustomGradientSelectTargetButton/CustomGradientSelectTargetButton";

export default function ArachnidHeader() {
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${WebImage})`,
        }}
        className="p-6 object-fill bg-no-repeat space-y-6 flex flex-col justify-center items-center"
      >
        <h1 className="text-center font-alata text-5xl font-normal custom-gradient-text">
          Arachnid
        </h1>
        <div className="flex justify-center">
          <CustomGradientSelectTargetButton />
        </div>
      </header>
    </>
  );
}
