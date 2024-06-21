import "./CustomRadioButton4.css";

export default function CustomRadioButton4() {
  return (
    <>
      <div className="container4">
        <label>
          <input name="e" type="radio" defaultChecked /> Click
        </label>
        <label>
          <input name="e" type="radio" /> Me
        </label>
        <label>
          <input name="e" type="radio" /> to
        </label>
        <label>
          <input name="e" type="radio" /> And so on ..
        </label>
      </div>
    </>
  );
}
