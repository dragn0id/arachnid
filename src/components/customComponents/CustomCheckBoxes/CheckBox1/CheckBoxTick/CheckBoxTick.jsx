/* eslint-disable react/prop-types */
import "./CheckBoxTick.css";

export default function CheckBoxTick({ onCheckboxChange, id, checked }) {
  return (
    <div className="checkbox-wrapper">
      <input
        id={id}
        type="checkbox"
        checked={checked} // Use the checked prop to control the component
        onChange={(e) => onCheckboxChange(e.target.checked)}
      />
      <label htmlFor={id}>
        <div className="tick_mark"></div>
      </label>
    </div>
  );
}
