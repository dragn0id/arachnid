/* eslint-disable react/prop-types */
import "./CheckBoxCross.css";

export default function CheckBoxCross({ onCheckboxChange, id, checked }) {
  return (
    <>
      <div className="col-md-6 reject-checkbox">
        <div className="mb-2 text-center">
          <div className="checkbox-wrapper">
            <input
              name="ehs_approval"
              className="form-check-label custom-radio-label"
              id={id}
              checked={!checked}
              type="checkbox"
              onChange={(e) => onCheckboxChange(!e.target.checked)} // Reverse the logic in onChange as well
            />
            <label htmlFor={id}>
              <div className="tick_mark">
                <div className="cross"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
