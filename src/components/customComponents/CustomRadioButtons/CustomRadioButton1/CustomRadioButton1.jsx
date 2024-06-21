import "./CustomRadioButton1.css";

export default function CustomRadioButton1() {
  return (
    <>
      <div className="radio-input1">
        <input
          defaultChecked
          className="input1 green"
          type="radio"
          name="radio1"
        />
        <input className="input1 yellow" type="radio" name="radio1" />
        <input className="input1 red" type="radio" name="radio1" />
      </div>
    </>
  );
}
