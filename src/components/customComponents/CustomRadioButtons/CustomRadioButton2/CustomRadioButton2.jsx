import "./CustomRadioButton2.css";

export default function CustomRadioButton2() {
  return (
    <>
      <div className="radio-input2">
        <label className="label2">
          <input type="radio" name="radio2" defaultChecked />
          <span className="check2"></span>
        </label>
        <label className="label2">
          <input type="radio" name="radio2" />
          <span className="check2"></span>
        </label>
        <label className="label2">
          <input type="radio" name="radio2" />
          <span className="check2"></span>
        </label>
      </div>
    </>
  );
}
