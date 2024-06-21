import "./CustomRadioButton6.css";

export default function CustomRadioButton6() {
  return (
    <>
      <div className="container6">
        <form>
          <label>
            <input type="radio" name="radio6" defaultChecked />
            <span>JSON</span>
          </label>
          <label>
            <input type="radio" name="radio6" />
            <span>CSV</span>
          </label>
          <label>
            <input type="radio" name="radio6" />
            <span>OTHER</span>
          </label>
        </form>
      </div>
    </>
  );
}
