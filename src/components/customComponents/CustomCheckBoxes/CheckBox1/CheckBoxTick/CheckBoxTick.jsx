/* eslint-disable react/prop-types */
import "./CheckBoxTick.css";

export default function CheckBoxTick({ onCheckboxChange }) {
  return (
    <div className="checkbox-wrapper">
      <input
        id="_checkbox-26"
        type="checkbox"
        onChange={(e) => onCheckboxChange(e.target.checked)}
      />
      <label htmlFor="_checkbox-26">
        <div className="tick_mark"></div>
      </label>
    </div>
  );
}
