import "./CustomRadioButton3.css";

export default function CustomRadioButton3() {
  return (
    <>
      <form className="radio-form">
        <input defaultChecked value="a" name="hopping" type="radio" id="a" />
        <label htmlFor="a">
          <span></span>A
        </label>
        <input value="b" name="hopping" type="radio" id="b" />
        <label htmlFor="b">
          <span></span>B
        </label>
        <input value="c" name="hopping" type="radio" id="c" />
        <label htmlFor="c">
          <span></span>C
        </label>
        <div className="worm">
          <div className="worm__segment"></div>
        </div>
      </form>
    </>
  );
}
